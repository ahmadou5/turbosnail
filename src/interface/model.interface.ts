export interface SnailPoolData {
  token_address: string;
  created_at: string;
  is_completed: boolean;
  real_sui_reserves: string;
  real_token_reserves: string;
  bonding_curve: string;
  created_by: string;
  deployment_fee: string;
  description: string;
  full_updated: boolean;
  lp_type: number;
  market_cap_sui: number;
  market_cap_usd: number;
  name: string;
  pool_id: string;
  remain_token_reserves: string;
  symbol: string;
  telegram: string;
  token_metadata: {
    decimals: number;
    name: string;
    symbol: string;
    description: string;
    iconUrl: string;
  };
  token_price_sui: number;
  token_price_usd: number;
  token_supply: string;
  twitter: string;
  updated_at: string;
  uri: string;
  virtual_sui_reserves: string;
  virtual_token_reserves: string;
  volume_24h_sui: number;
  volume_24h_usd: number;
  volume_sui: string;
  volume_usd: string;
  website: string;
}

export interface TokenMetadata {
  decimals: number;
  name: string;
  symbol: string;
  description: string;
  iconUrl: string;
  id: string;
}

export interface Trade {
  sender: string;
  is_buy: boolean;
  sui_amount: number;
  token_amount: number;
  timestamp: string;
  tx_digest: string;
  token_address: string;
  pool_id: string;
}

export interface ApiResponse {
  page: number;
  pageSize: number;
  total: number;
  data: Trade[];
}
