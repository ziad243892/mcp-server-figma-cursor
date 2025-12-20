/**
 * Design Token CSS Variables Generator
 * 
 * This script converts design tokens from JSON format to CSS custom properties.
 * It resolves token references and generates CSS variables for use in Angular applications.
 * 
 * Usage: node scripts/generate-css-variables.js
 */

const fs = require('fs');
const path = require('path');

// Token reference resolver - resolves {collection.token.path} references
function resolveTokenReference(value, tokens, visited = new Set()) {
  if (typeof value !== 'string' || !value.startsWith('{')) {
    return value;
  }

  // Extract reference path: {primitive.colors.blue.500}
  const refPath = value.slice(1, -1).split('.');
  
  // Prevent circular references
  const refKey = refPath.join('.');
  if (visited.has(refKey)) {
    console.warn(`Circular reference detected: ${refKey}`);
    return value;
  }
  visited.add(refKey);

  // Navigate through token structure
  let current = tokens;
  for (const key of refPath) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      console.warn(`Token reference not found: ${value}`);
      return value;
    }
  }

  // If the resolved value is still a reference, resolve it recursively
  if (typeof current === 'object' && current.$value) {
    return resolveTokenReference(current.$value, tokens, visited);
  }

  return current;
}

// Flatten token object into CSS variable format
function flattenTokens(obj, prefix = '', tokens = null) {
  if (!tokens) tokens = obj; // First call - obj is the root tokens
  
  const result = {};
  
  for (const [key, value] of Object.entries(obj)) {
    // Skip metadata keys
    if (key.startsWith('$')) continue;
    
    const newKey = prefix ? `${prefix}-${key}` : key;
    
    if (value && typeof value === 'object') {
      // Check if this is a token with $value
      if ('$value' in value) {
        const resolvedValue = resolveTokenReference(value.$value, tokens);
        result[newKey] = resolvedValue;
      } else {
        // Recursively flatten nested objects
        Object.assign(result, flattenTokens(value, newKey, tokens));
      }
    } else {
      result[newKey] = value;
    }
  }
  
  return result;
}

// Convert token value to CSS value
function toCSSValue(value, type) {
  if (typeof value === 'number') {
    return value.toString();
  }
  
  if (Array.isArray(value)) {
    return value.join(', ');
  }
  
  if (typeof value === 'string') {
    // If it's a dimension with unit, return as-is
    if (value.match(/^\d+px$/) || value.match(/^\d+rem$/) || value.match(/^\d+em$/)) {
      return value;
    }
    // If it's a color hex, return as-is
    if (value.match(/^#[\da-fA-F]{3,8}$/)) {
      return value;
    }
    // If it's a number string, add px if it's a dimension type
    if (type === 'dimension' && /^\d+$/.test(value)) {
      return `${value}px`;
    }
    return value;
  }
  
  return String(value);
}

// Generate CSS variables from flattened tokens
function generateCSSVariables(tokens, collectionName) {
  const flattened = flattenTokens(tokens);
  const cssVars = [];
  
  cssVars.push(`/* ${collectionName} Collection */`);
  cssVars.push(`:root {`);
  
  for (const [key, value] of Object.entries(flattened)) {
    // Convert kebab-case to CSS variable format
    const cssVarName = `--token-${collectionName}-${key}`.toLowerCase();
    const cssValue = toCSSValue(value);
    cssVars.push(`  ${cssVarName}: ${cssValue};`);
  }
  
  cssVars.push(`}`);
  cssVars.push('');
  
  return cssVars.join('\n');
}

// Main function
function main() {
  const tokensDir = path.join(__dirname, '..', 'tokens');
  const outputDir = path.join(__dirname, '..', 'dist');
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Collections to process
  const collections = ['primitive', 'alias', 'component-specific', 'universal'];
  const allCSS = [];
  
  collections.forEach(collectionName => {
    const collectionPath = path.join(tokensDir, collectionName, 'index.json');
    
    if (fs.existsSync(collectionPath)) {
      try {
        const collectionData = JSON.parse(fs.readFileSync(collectionPath, 'utf8'));
        const css = generateCSSVariables(collectionData, collectionName);
        allCSS.push(css);
        console.log(`✓ Generated CSS for ${collectionName} collection`);
      } catch (error) {
        console.error(`Error processing ${collectionName}:`, error.message);
      }
    } else {
      console.warn(`Collection file not found: ${collectionPath}`);
    }
  });
  
  // Write combined CSS file
  const outputPath = path.join(outputDir, 'design-tokens.css');
  const header = `/* Design Tokens - Alkhwarizmi Design System */
/* Generated from Figma variable structure */
/* DO NOT EDIT - This file is auto-generated */
\n`;
  
  fs.writeFileSync(outputPath, header + allCSS.join('\n'), 'utf8');
  console.log(`\n✓ Generated CSS variables: ${outputPath}`);
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { generateCSSVariables, resolveTokenReference, flattenTokens };

