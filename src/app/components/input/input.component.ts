import { Component, Input } from '@angular/core';

@Component({
  selector: 'alk-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: false
})
export class InputComponent {
  @Input() label?: string;
  @Input() placeholder: string = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled: boolean = false;
  @Input() type: string = 'text';
  @Input() value: string = '';
}

