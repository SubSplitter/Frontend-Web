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
    this.apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
    this.serviceCache = new Map();
  }

  async getAllPools(): Promise<Pool[]> {
    try {
      // Make the API request
      const response = await fetch(`${this.apiUrl}/subscriptions`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      // Clone the response before logging
      const responseToLog = response.clone();
      console.log("API Response:", responseToLog);
      
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
        throw new Error(`API error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error joining pool:', error);
      throw error;
    }
  }

  async leavePool(poolId: string): Promise<void> {
    try {
      // Get authentication token first
      const tokenResponse = await fetch('/api/auth');
      
      if (!tokenResponse.ok) {
        throw new Error('Failed to get authentication token');
      }
      
      const { accessToken } = await tokenResponse.json();

      const response = await fetch(`${this.apiUrl}/subscriptions/${poolId}/leave`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
        // No need to send userId in body since it will be extracted from token
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error leaving pool:', error);
      throw error;
    }
  }

  // Fetch service information from the API
  private async getServiceInfo(serviceId: string): Promise<ServiceInfo> {
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