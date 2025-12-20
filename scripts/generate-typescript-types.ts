/**
 * Design Token TypeScript Types Generator
 * 
 * This script generates TypeScript type definitions for design tokens.
 * It creates type-safe interfaces for use in Angular components.
 * 
 * Usage: ts-node scripts/generate-typescript-types.ts
 */

import * as fs from 'fs';
import * as path from 'path';

interface TokenValue {
  value: string | number | string[];
  type?: string;
  unit?: string;
  $value?: string;
  $type?: string;
  description?: string;
}

interface TokenCollection {
  [key: string]: TokenValue | TokenCollection;
}

/**
 * Convert kebab-case or camelCase to PascalCase
 */
function toPascalCase(str: string): string {
  return str
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

/**
 * Generate TypeScript interface from token structure
 */
function generateTypeScriptInterface(
  obj: TokenCollection,
  interfaceName: string,
  indent: string = '  '
): string {
  const lines: string[] = [];
  lines.push(`export interface ${interfaceName} {`);
  
  for (const [key, value] of Object.entries(obj)) {
    // Skip metadata keys
    if (key.startsWith('$')) continue;
    
    if (value && typeof value === 'object' && !('$value' in value)) {
      // Nested object - create nested interface
      const nestedInterfaceName = `${interfaceName}${toPascalCase(key)}`;
      const nestedInterface = generateTypeScriptInterface(
        value as TokenCollection,
        nestedInterfaceName,
        indent + '  '
      );
      lines.push(nestedInterface);
      lines.push(`${indent}${key}: ${nestedInterfaceName};`);
    } else {
      // Leaf value - determine type
      const tokenValue = value as TokenValue;
      let tsType = 'string | number';
      
      if (tokenValue.$type || tokenValue.type) {
        const type = tokenValue.$type || tokenValue.type;
        switch (type) {
          case 'color':
            tsType = 'string';
            break;
          case 'dimension':
            tsType = 'string';
            break;
          case 'fontFamily':
            tsType = 'string | string[]';
            break;
          case 'fontWeight':
            tsType = 'string | number';
            break;
          case 'number':
            tsType = 'number';
            break;
          default:
            tsType = 'string | number';
        }
      }
      
      const comment = tokenValue.description 
        ? ` // ${tokenValue.description}`
        : '';
      lines.push(`${indent}${key}: ${tsType};${comment}`);
    }
  }
  
  lines.push('}');
  return lines.join('\n');
}

/**
 * Main function to generate TypeScript types
 */
function main() {
  const tokensDir = path.join(__dirname, '..', 'tokens');
  const outputDir = path.join(__dirname, '..', 'dist');
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const collections = [
    { name: 'primitive', file: 'primitive/index.json' },
    { name: 'alias', file: 'alias/index.json' },
    { name: 'component', file: 'component-specific/index.json' },
    { name: 'universal', file: 'universal/index.json' }
  ];
  
  const allInterfaces: string[] = [];
  allInterfaces.push(`/**
 * Design Token Type Definitions
 * Alkhwarizmi Design System
 * 
 * Auto-generated from design token JSON files.
 * DO NOT EDIT - This file is auto-generated.
 */\n`);
  
  collections.forEach(({ name, file }) => {
    const filePath = path.join(tokensDir, file);
    
    if (fs.existsSync(filePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const interfaceName = toPascalCase(name) + 'Tokens';
        const interfaceCode = generateTypeScriptInterface(data, interfaceName);
        allInterfaces.push(interfaceCode);
        allInterfaces.push('');
        console.log(`✓ Generated types for ${name} collection`);
      } catch (error) {
        console.error(`Error processing ${name}:`, error);
      }
    }
  });
  
  // Write TypeScript definitions file
  const outputPath = path.join(outputDir, 'design-tokens.d.ts');
  fs.writeFileSync(outputPath, allInterfaces.join('\n'), 'utf8');
  console.log(`\n✓ Generated TypeScript types: ${outputPath}`);
}

// Run if executed directly
if (require.main === module) {
  main();
}

export { generateTypeScriptInterface, toPascalCase };

