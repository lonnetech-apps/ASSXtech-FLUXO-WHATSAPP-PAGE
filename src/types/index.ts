export interface FiberPlan {
  id: string;
  name: string;
  speed: string; // e.g. "350 Mega", "500 Mega", "800 Mega", "1 Giga"
  speedNum: number; // in Mbps (1000 for 1 Giga)
  price: string;
  badge?: string;
  popular?: boolean;
  idealFor: string;
  summary: string;
  whatYouCanDo: string[];
  benefits: string[];
  specs: {
    download: string;
    upload: string;
    wifiType: string;
    latency: string;
    devices: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user' | 'system';
  text: string;
  timestamp: string;
  type?: 'text' | 'plan_selection' | 'plan_details' | 'address_confirm' | 'final_summary';
  planSelected?: FiberPlan;
}

export interface LeadData {
  name: string;
  whatsapp: string;
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  number: string;
  complement?: string;
  planId?: string;
}
