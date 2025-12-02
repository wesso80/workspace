import axios from 'axios';

const API_BASE = 'https://app.marketscannerpros.app';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  score: number;
  signal: 'Bullish' | 'Bearish';
  volume: number;
  atr: number;
}

export interface PortfolioPosition {
  id: string;
  symbol: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
}

export interface Trade {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  tradeType: 'Spot' | 'Options' | 'Futures' | 'Margin';
  shares: number;
  entryPrice: number;
  exitPrice: number | null;
  date: string;
  pnl: number | null;
  status: 'open' | 'closed';
}

export interface PriceAlert {
  id: string;
  symbol: string;
  condition: 'above' | 'below';
  price: number;
  active: boolean;
}

export const marketService = {
  async getEquityScan(): Promise<MarketData[]> {
    try {
      const response = await api.get('/api/scan/equities');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch equity scan:', error);
      throw error;
    }
  },

  async getCryptoScan(): Promise<MarketData[]> {
    try {
      const response = await api.get('/api/scan/crypto');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch crypto scan:', error);
      throw error;
    }
  },

  async getCommoditiesScan(): Promise<MarketData[]> {
    try {
      const response = await api.get('/api/scan/commodities');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch commodities scan:', error);
      throw error;
    }
  },

  async getQuote(symbol: string): Promise<MarketData> {
    try {
      const response = await api.get(`/api/quote/${symbol}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch quote for ${symbol}:`, error);
      throw error;
    }
  },
};

export const portfolioService = {
  async getPositions(): Promise<PortfolioPosition[]> {
    try {
      const response = await api.get('/api/portfolio');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch portfolio:', error);
      throw error;
    }
  },

  async addPosition(position: Omit<PortfolioPosition, 'id' | 'currentPrice'>): Promise<PortfolioPosition> {
    try {
      const response = await api.post('/api/portfolio', position);
      return response.data;
    } catch (error) {
      console.error('Failed to add position:', error);
      throw error;
    }
  },

  async updatePosition(id: string, updates: Partial<PortfolioPosition>): Promise<PortfolioPosition> {
    try {
      const response = await api.patch(`/api/portfolio/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error('Failed to update position:', error);
      throw error;
    }
  },

  async deletePosition(id: string): Promise<void> {
    try {
      await api.delete(`/api/portfolio/${id}`);
    } catch (error) {
      console.error('Failed to delete position:', error);
      throw error;
    }
  },
};

export const tradeService = {
  async getTrades(filter?: 'open' | 'closed'): Promise<Trade[]> {
    try {
      const response = await api.get('/api/trades', { params: { status: filter } });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch trades:', error);
      throw error;
    }
  },

  async logTrade(trade: Omit<Trade, 'id' | 'pnl'>): Promise<Trade> {
    try {
      const response = await api.post('/api/trades', trade);
      return response.data;
    } catch (error) {
      console.error('Failed to log trade:', error);
      throw error;
    }
  },

  async closeTrade(id: string, exitPrice: number): Promise<Trade> {
    try {
      const response = await api.patch(`/api/trades/${id}/close`, { exitPrice });
      return response.data;
    } catch (error) {
      console.error('Failed to close trade:', error);
      throw error;
    }
  },
};

export const alertService = {
  async getAlerts(): Promise<PriceAlert[]> {
    try {
      const response = await api.get('/api/alerts');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
      throw error;
    }
  },

  async createAlert(alert: Omit<PriceAlert, 'id'>): Promise<PriceAlert> {
    try {
      const response = await api.post('/api/alerts', alert);
      return response.data;
    } catch (error) {
      console.error('Failed to create alert:', error);
      throw error;
    }
  },

  async toggleAlert(id: string, active: boolean): Promise<PriceAlert> {
    try {
      const response = await api.patch(`/api/alerts/${id}`, { active });
      return response.data;
    } catch (error) {
      console.error('Failed to toggle alert:', error);
      throw error;
    }
  },

  async deleteAlert(id: string): Promise<void> {
    try {
      await api.delete(`/api/alerts/${id}`);
    } catch (error) {
      console.error('Failed to delete alert:', error);
      throw error;
    }
  },
};

export default api;
