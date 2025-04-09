declare module '@modelcontextprotocol/sdk' {
  export class McpServer {
    constructor(options: {
      tools: any[];
      port: number;
      auth: {
        type: string;
      };
    });
    
    port: number;
    
    start(): Promise<void>;
  }

  export function createTool(config: {
    name: string;
    description: string;
    parameters: {
      type: string;
      properties: Record<string, any>;
      required?: string[];
    };
    handler: (params: any) => Promise<any>;
  }): any;

  export const mcpAuthRouter: any;
}
