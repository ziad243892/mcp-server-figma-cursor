import { Component } from '@angular/core';

/**
 * Accordion Showcase Component
 * Displays all accordion variants for testing
 */
@Component({
  selector: 'alk-accordion-showcase',
  templateUrl: './accordion-showcase.component.html',
  styleUrls: ['./accordion-showcase.component.scss'],
  standalone: false
})
export class AccordionShowcaseComponent {
  // Available sizes
  sizes: Array<'Large' | 'Medium' | 'Small'> = ['Large', 'Medium', 'Small'];
  
  // Available icon alignments
  iconAlignments: Array<'Leading' | 'Trailing'> = ['Leading', 'Trailing'];
  
  // RTL toggle
  rtl: boolean = false;
  
  // Expanded states for examples
  expandedStates: { [key: string]: boolean } = {};
  
  toggleRtl(): void {
    this.rtl = !this.rtl;
  }
  
  toggleAccordion(key: string): void {
    this.expandedStates[key] = !this.expandedStates[key];
  }
  
  isExpanded(key: string): boolean {
    return this.expandedStates[key] || false;
  }
  
  getAccordionKey(size: string, alignment: string, index: number): string {
    return `${size}-${alignment}-${index}`;
  }
}

