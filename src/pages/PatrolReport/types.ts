export interface Report {
  id: number;
  station: string;
  date: string;
  status: '已完成' | '进行中' | '待处理';
  faults: number;
  inspector: string;
}

export interface InspectionFault {
  id: number;
  type: '锈蚀' | '断裂' | '松动';
  confidence: number;
  position: string;
  image: string;
  timestamp: number;
  imageId: number;
}

export interface FaultDetail {
  id: number;
  type: string;
  location: string;
  severity: string;
  confidence: number;
  suggestion: string;
}
