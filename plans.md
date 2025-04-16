# Rijksmuseum OAIPMH MCP Server Implementation Plan

## Phase 1: Project Setup & Environment Configuration

### 1.1 Project Initialization
- Create project directory structure
- Initialize npm project with package.json
- Create .gitignore file to exclude node_modules, dist, etc.

### 1.2 TypeScript Configuration
- Install TypeScript and dependencies
- Create tsconfig.json with appropriate settings for ES modules support
- Configure source maps for debugging

### 1.3 Install Core Dependencies
- Install MCP TypeScript SDK
- Install utility packages (zod, axios, xml2js)

## Phase 2: Rijksmuseum OAIPMH API Integration

### 2.1 API Research and Documentation
- Study the Rijksmuseum OAIPMH API documentation at https://data.rijksmuseum.nl/docs/oai-pmh/verbs
- Identify all available verbs (Identify, ListMetadataFormats, ListSets, etc.)
- Understand response formats and data structures

### 2.2 API Client Implementation
- Create API client module for OAIPMH API
- Implement base request function with axios for HTTP requests
- Add XML parsing functionality with xml2js
- Create specific functions for each OAI-PMH verb:
  - Identify
  - ListMetadataFormats
  - ListSets
  - GetRecord
  - ListIdentifiers
  - ListRecords
- Add error handling and response validation

### 2.3 Create Type Definitions
- Define TypeScript interfaces for OAI-PMH responses
- Create utility types for request parameters
- Implement response transformation functions to convert XML to structured data

## Phase 3: MCP Server Core Implementation

### 3.1 Basic Server Setup
- Create main entry point file
- Initialize MCP server with metadata
- Set up stdio transport for Claude Desktop integration

### 3.2 Implement MCP Tools
- Create MCP tools for each OAI-PMH verb:
  - identify: Repository information
  - list-metadata-formats: Available metadata formats
  - list-sets: Collection sets
  - get-record: Retrieve specific records
  - list-identifiers: List record identifiers
  - list-records: List complete records
- Implement input validation with Zod schemas
- Create helper functions for formatting responses

### 3.3 Implement MCP Resources
- Create resource templates for documentation
- Create resource for API documentation
- Implement dynamic resource for record previews
- Add resource for explaining metadata formats
- Implement resource for explaining specific OAI-PMH sets

## Phase 4: Advanced Features & Optimizations

### 4.1 Response Processing
- Create utilities to transform XML responses into user-friendly formats
- Add support for different metadata formats (Dublin Core, etc.)
- Implement response caching to improve performance
- Create utility functions to extract meaningful data from complex responses

### 4.2 Error Handling
- Implement comprehensive error handling
- Create user-friendly error messages
- Add logging for debugging
- Handle rate limiting and API throttling

### 4.3 Implement Resumption Tokens
- Add support for pagination via resumption tokens
- Create utilities to handle automatic pagination for large result sets
- Implement state management for ongoing retrievals

## Phase 5: Testing & Debugging

### 5.1 Setup Testing Environment
- Install testing libraries
- Create test fixtures with sample OAIPMH responses
- Set up mock API responses for testing

### 5.2 MCP Inspector Integration
- Install MCP Inspector
- Configure package.json script for inspector
- Use inspector for interactive testing and debugging

### 5.3 Unit Tests
- Write tests for API client functions
- Test MCP tool implementations
- Validate resource implementations
- Test error handling scenarios

## Phase 6: Documentation & Deployment

### 6.1 Create User Documentation
- Write README.md with installation and usage instructions
- Document available tools and resources
- Create example queries and use cases
- Add troubleshooting section

### 6.2 Build Configuration
- Configure TypeScript compilation
- Create build scripts in package.json
- Optimize for production usage

### 6.3 Claude Desktop Integration
- Document how to add the server to Claude Desktop
- Create a simple installation script
- Test integration with Claude Desktop
- Provide example prompts for Claude to utilize the MCP

## Phase 7: Extensions & Future Improvements

### 7.1 Advanced Query Features
- Implement complex search functionality
- Add support for filtering by metadata fields
- Create specialized tools for common use cases

### 7.2 Performance Optimizations
- Implement response caching
- Add batch processing capabilities
- Optimize XML parsing and transformation

### 7.3 User Experience Enhancements
- Add progress notifications for long-running operations
- Implement tools for presenting results in various formats
- Create interactive browsing capabilities
