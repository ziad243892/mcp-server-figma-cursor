import { Component } from '@angular/core';

/**
 * Button Showcase Component
 * Displays all button variants for testing
 */
@Component({
  selector: 'alk-button-showcase',
  templateUrl: './button-showcase.component.html',
  styleUrls: ['./button-showcase.component.scss'],
  standalone: false
})
export class ButtonShowcaseComponent {
  // Available colors
  colors: Array<'teal' | 'red-brown' | 'navy' | 'steel-blue' | 'muted-indigo'> = [
    'teal',
    'red-brown',
    'navy',
    'steel-blue',
    'muted-indigo'
  ];
  
  // Available sizes
  sizes: Array<'Large' | 'Medium' | 'Small'> = ['Large', 'Medium', 'Small'];
  
  // Available variants
  variants: Array<'filled' | 'outlined' | 'transparent'> = ['filled', 'outlined', 'transparent'];
  
  // RTL toggle
  rtl: boolean = false;
  
  toggleRtl(): void {
    this.rtl = !this.rtl;
  }
}

