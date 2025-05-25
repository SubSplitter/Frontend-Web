// services/poolService.ts
import { Pool, Member } from '../types';

interface ApiPool {
  poolId: string;
  userId: string;
  serviceId: string;
  name: string | null;
  encryptedCredentials: string;
  slotsTotal: number;
  slotsAvailable: number;
  costPerSlot: string;
  createdAt: string;
  updatedAt: string;
  region: string | null;
  isActive: boolean;
}

interface JoinedPool {
  poolId: string;
  name: string;
  serviceId: string;
  slotsTotal: number;
  slotsAvailable: number;
  costPerSlot: string;
  membershipStatus: {
    paymentStatus: string;
    accessStatus: string;
    joinedAt: string;
  };
  membershipId?: string;
  serviceName?: string;
  serviceLogoUrl?: string;
}

interface ServiceInfo {
  id: string;
  name: string;
  logoUrl: string;
  color: string;
}

interface CreatePoolData {
  serviceId: string;
  name: string;
  encryptedCredentials: string;
  slotsTotal: number;
  costPerSlot: number;
}

class PoolService {
  private apiUrl: string;
  private serviceCache: Map<string, ServiceInfo>;
  
  constructor() {
    this.apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://www.subspliter.com/api/api';
    this.serviceCache = new Map();
  }

  async getUserPools(): Promise<JoinedPool[]> {
    try {
      // Get authentication token first
      const tokenResponse = await fetch('/api/auth/', {  // add slash here
        credentials: 'include',                          // include cookies
      });
            
      if (!tokenResponse.ok) {
        console.error('Auth token fetch failed with status:', tokenResponse.status);
        return []; // Return empty array instead of throwing
      }
      
      const { accessToken } = await tokenResponse.json();
      
      // Make the API request to get current user's pool memberships
      const response = await fetch(`${this.apiUrl}/pool-members/current-user`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      if (!response.ok) {
        // Log error but don't throw - just return empty array
        console.error(`API error fetching user pools: ${response.status}`);
        return [];
      }
      
      const data = await response.json();
      console.log("User Pools Data:", data);
      
      // Transform the data to match JoinedPool interface
      return data.map((pool: any) => ({
        poolId: pool.poolId,
        name: pool.name || 'Subscription Pool',
        serviceId: pool.serviceId,
        slotsTotal: pool.slotsTotal,
        slotsAvailable: pool.slotsAvailable,
        costPerSlot: pool.costPerSlot,
        membershipStatus: {
          // Use default values if not provided by API
          paymentStatus: 'paid',
          accessStatus: pool.isActive ? 'active' : 'inactive',
          joinedAt: pool.createdAt
        }
      }));
    } catch (error) {
      console.error('Error fetching user pools:', error);
      return [];
    }
  }

  // Fetch service information from the API
  async getServiceInfo(serviceId: string): Promise<ServiceInfo> {
    // Check if we have this service in cache
    if (this.serviceCache.has(serviceId)) {
      return this.serviceCache.get(serviceId)!;
    }
    
    try {
      const response = await fetch(`${this.apiUrl}/subscription-services/${serviceId}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const serviceData = await response.json();
      
      // Create service info object
      const serviceInfo: ServiceInfo = {
        id: serviceId,
        name: serviceData.name || 'Subscription Service',
        logoUrl: serviceData.logoUrl || '/assets/logos/default.svg',
        color: serviceData.color || '#6366f1'
      };
      
      // Cache the service info
      this.serviceCache.set(serviceId, serviceInfo);
      
      return serviceInfo;
    } catch (error) {
      console.error(`Error fetching service ${serviceId}:`, error);
      // Return default service info in case of error
      return {
        id: serviceId,
        name: 'Subscription Service',
        logoUrl: '/assets/logos/default.svg',
        color: '#6366f1'
      };
    }
  }

  async getAllPools(): Promise<Pool[]> {
    try {
      // Make the auth request with proper credentials
      const tokenResponse = await fetch('/api/auth', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // More detailed error handling for auth
      if (!tokenResponse.ok) {
        console.error('Auth response status:', tokenResponse.status);
        throw new Error(`Authentication failed: ${tokenResponse.status}`);
      }
      
      // Extract token with error handling
      const tokenData = await tokenResponse.json();
      if (!tokenData || !tokenData.accessToken) {
        console.error('Invalid token data:', tokenData);
        throw new Error('Missing access token in response');
      }
      
      const accessToken = tokenData.accessToken;
      
      // Make the API request with token
      const response = await fetch(`${this.apiUrl}/subscriptions`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include' // Include credentials for this request too
      });
      
      console.log("API:", `${this.apiUrl}/subscriptions`);
      console.log("API Response:", response);
      
      if (!response.ok) {
        console.error('Subscription response headers:', Object.fromEntries([...response.headers]));
        throw new Error(`API error: ${response.status}`);
      }
      
      // Parse the response as JSON
      const data = await response.json();
      console.log("API Data:", data);
      
      // Check if data is empty array and handle appropriately
      if (!data || data.length === 0) {
        console.log("No pools returned from API");
        return [];
      }
      
      // Transform the API data to match your Pool interface
      return await this.transformPools(data);
    } catch (error) {
      console.error('Error fetching pools:', error);
      throw error;
    }
  }

  async createPool(poolData: CreatePoolData): Promise<Pool> {
    try {
      // Instead of directly using getKindeServerSession, fetch the token from our API route
      const tokenResponse = await fetch('/api/auth');
      
      if (!tokenResponse.ok) {
        throw new Error('Failed to get authentication token');
      }
      
      const { accessToken } = await tokenResponse.json();
      
      if (!accessToken) {
        throw new Error('Authentication token not found');
      }
      
      // Prepare the request payload without userId since backend will identify it
      const payload = {
        serviceId: poolData.serviceId,
        name: poolData.name,
        encryptedCredentials: poolData.encryptedCredentials,
        slotsTotal: poolData.slotsTotal,
        costPerSlot: poolData.costPerSlot.toString(), // API expects this as a string
        isActive: true,
        region: null
      };
      
      // Make the API request with the Authorization header
      const response = await fetch(`${this.apiUrl}/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      // Parse the response
      const data = await response.json();
      console.log("Create Pool Response:", data);
      
      // Transform the response to match your Pool interface
      // Assuming the API returns the newly created pool
      const pools = await this.transformPools([data]);
      return pools[0];
    } catch (error) {
      console.error('Error creating pool:', error);
      throw error;
    }
  }

  async joinPool(poolId: string): Promise<void> {
    try {
      // Get authentication token first
      const tokenResponse = await fetch('/api/auth');
      
      if (!tokenResponse.ok) {
        throw new Error('Failed to get authentication token');
      }
      
      const { accessToken } = await tokenResponse.json();

      const response = await fetch(`${this.apiUrl}/subscriptions/${poolId}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
        // No need to send userId in body since it will be extracted from token
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message && errorData.message.includes('already a member')) {
          throw new Error('You have already joined this subscription pool');
        }
        throw new Error(`API error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error joining pool:', error);
      throw error;
    }
  }

  // Add this method to your PoolService class
 

  async leavePool(poolMemberId: string): Promise<void> {
    try {
      // Get authentication token first
      const tokenResponse = await fetch('/api/auth');
      
      if (!tokenResponse.ok) {
        throw new Error('Failed to get authentication token');
      }
      
      const { accessToken } = await tokenResponse.json();

      const response = await fetch(`${this.apiUrl}/pool-members/${poolMemberId}/leave`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
        // No need to send userId in body since it will be extracted from token
      });
      console.log("Leave Pool Response:", response);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error leaving pool:', error);
      throw error;
    }
  }

  // Transform API data to match application's Pool interface
  private async transformPools(apiPools: ApiPool[]): Promise<Pool[]> {
    // Fetch all service information in parallel
    const serviceInfoPromises = apiPools.map(pool => this.getServiceInfo(pool.serviceId));
    const serviceInfos = await Promise.all(serviceInfoPromises);
    
    // Create a map of service IDs to their info
    const serviceInfoMap = new Map<string, ServiceInfo>();
    serviceInfos.forEach(info => serviceInfoMap.set(info.id, info));
    
    return apiPools.map((apiPool): Pool => {
      // Calculate next billing date (one month from now)
      const today = new Date();
      const nextBillingDate = new Date(today);
      nextBillingDate.setMonth(today.getMonth() + 1);

      // Default member for the pool creator
      const defaultMember: Member = {
        id: apiPool.userId,
        name: 'Pool Creator',
        isPrimary: true
      };

      // Get service info from our map
      const serviceInfo = serviceInfoMap.get(apiPool.serviceId) || {
        id: apiPool.serviceId,
        name: apiPool.name || 'Subscription Service',
        logoUrl: '/assets/logos/default.svg',
        color: '#6366f1'
      };

      // Return the transformed pool object
      return {
        id: apiPool.poolId,
        serviceName: serviceInfo.name,
        serviceLogo: serviceInfo.logoUrl,
        serviceColor: serviceInfo.color,
        plan: 'Standard Plan',
        totalCost: parseFloat(apiPool.costPerSlot) * apiPool.slotsTotal,
        splitCost: parseFloat(apiPool.costPerSlot),
        members: [defaultMember],
        capacity: apiPool.slotsTotal,
        slotsAvailable: apiPool.slotsAvailable,
        expiresAt: nextBillingDate.toISOString(),
        status: apiPool.isActive ? 'active' : 'expired',
        lastPayment: apiPool.updatedAt
      };
    });
  }
}

export const poolService = new PoolService();