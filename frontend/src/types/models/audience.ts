/**
 * 定向包数据模型
 */
export interface Audience {
  id: string;
  name: string;
  description: string;
  type: 'custom' | 'system' | 'intelligent';
  scope: 'all' | 'limited';
  project: string;
  organization: string;
  account: string;
  accountName: string;
  status: 'active' | 'inactive' | 'syncing';
  createdAt: string;
  updatedAt: string;
  userCount?: number;
}

export interface AudienceFilters {
  account?: string;
  status?: string;
  type?: string;
  scope?: string;
  project?: string;
  keyword?: string;
}

export interface AudienceListParams extends AudienceFilters {
  page: number;
  pageSize: number;
}

export interface AudienceListResponse {
  list: Audience[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CreateAudienceData {
  name: string;
  description: string;
  type: string;
  scope: string;
  project: string;
  organization: string;
  targeting: {
    age?: number[];
    gender?: string[];
    region?: string[];
    interests?: string[];
    behavior?: string[];
    device?: string[];
  };
}
