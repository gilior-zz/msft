export interface Properties {
    displayName: string;
    description: string;
    alertRuleTemplateName: string;
    tactics: string[];
    severity: string;
    enabled: boolean;
    lastModifiedUtc: Date;
}

export interface IRes {
    id: string;
    name: string;
    etag: string;
    type: string;
    kind: string;
    properties: Properties;
}



