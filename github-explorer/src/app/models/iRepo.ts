export interface IRepo {
  full_name?: string;
  html_url?: string;
  description?: string;
  forks?: number;
  stargazers_count?: number;
  owner?: IOwner;
}

interface IOwner {
  login?: string;
  avatar_url?: string;
}
