export type ConsoleMessageClass =
    | 'info'
    | 'success'
    | 'failure'

export interface OrgTypeDetails {
    displayName: string;
    name: string;
}

export interface OrgType {
    enabled: boolean;
    id: string | number;
    name: string;
    orgTypeDetails: OrgTypeDetails;
}
export interface LibType {
    enabled: boolean;
    id: string | number;
    name: string;
}
export interface OrgAggregator {
    id: string;
    displayName: string;
    orgs: OrgType[];
}

export interface StandardFormProps {
    addConsoleMessage: (consoleMessage: string, messageClass?: ConsoleMessageClass) => void;
    setLoading: (isLoading: boolean) => void;
}

