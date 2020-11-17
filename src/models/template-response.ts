

    export interface RequiredDataConnector {
        connectorId: string;
        dataTypes: string[];
    }

    export interface Properties {
        severity: string;
        query: string;
        queryFrequency: string;
        queryPeriod: string;
        triggerOperator: string;
        triggerThreshold: number;
        displayName: string;
        description: string;
        tactics: string[];
        createdDateUTC: Date;
        status: string;
        requiredDataConnectors: RequiredDataConnector[];
        alertRulesCreatedByTemplateCount: number;
        productFilter: string;
    }

    export interface Value {
        id: string;
        name: string;
        type: string;
        kind: string;
        properties: Properties;
    }

    export interface TemplateResponse {
        value: Value[];
    }



