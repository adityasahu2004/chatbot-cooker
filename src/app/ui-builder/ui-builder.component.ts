import { Component, OnInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ui-builder',
  templateUrl: './ui-builder.component.html',
  styleUrls: ['./ui-builder.component.css'],
  standalone: true,
  imports: [CommonModule, DragDropModule, FormsModule]
})
export class UiBuilderComponent implements OnInit, OnDestroy {
  public contextMenu: {
    show: boolean;
    x: number;
    y: number;
    widget: any;
  } = {
    show: false,
    x: 0,
    y: 0,
    widget: null
  };

  widgets = [
    { type: 'sender-chat-bubble', label: 'Sender Chat Bubble', message: 'Hello! How are you?' },
    { type: 'receiver-chat-bubble', label: 'Receiver Chat Bubble', message: 'Hi! I\'m good, thanks!' },
    { type: 'search-icon', label: 'Search Icon' },
    { type: 'send-icon', label: 'Send Icon' },
    { type: 'textbox', label: 'Textbox' },
    { type: 'mic-icon', label: 'Mic Icon' },
    { type: 'dark-mode-switch', label: 'Dark Mode Switch' },
    { type: 'button', label: 'Button' },
    { type: 'checkbox', label: 'Checkbox' },
    { type: 'radio', label: 'Radio Button' },
    { type: 'dropdown', label: 'Dropdown', options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' }
    ]},
    { type: 'textarea', label: 'Textarea' },
    { type: 'label', label: 'Label' }
  ];

  canvas: any[] = [];
  sidebarMinimized = false;
  selectedWidget: any = null;
  draggingIndex: number | null = null;
  dragOffset: { x: number, y: number } = { x: 0, y: 0 };
  onDragBound = this.onDrag.bind(this);
  endDragBound = this.endDrag.bind(this);

  private documentClickListener: () => void = () => {};

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      this.documentClickListener = this.renderer.listen('document', 'click', () => {
        this.contextMenu.show = false;
      });

      const savedLayout = localStorage.getItem('uiBuilderLayout');
      if (savedLayout) {
        this.canvas = JSON.parse(savedLayout);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.documentClickListener) {
      this.documentClickListener();
    }
    // Clean up event listeners
    if (typeof window !== 'undefined') {
      window.removeEventListener('mousemove', this.onDragBound);
      window.removeEventListener('mouseup', this.endDragBound);
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer !== event.container) {
      const newWidget = { ...event.previousContainer.data[event.previousIndex] };
      if (newWidget.x === undefined) newWidget.x = 0;
      if (newWidget.y === undefined) newWidget.y = 0;
      this.canvas.push(newWidget); // Add to end, or set a default position
    }
    // Do not reorder the array if dragging within the canvas
  }

  onRightClick(event: MouseEvent, widget: any) {
    event.preventDefault();
    this.contextMenu.show = true;
    this.contextMenu.x = event.clientX;
    this.contextMenu.y = event.clientY;
    this.contextMenu.widget = widget;
  }

  editWidgetLabel() {
    if (this.contextMenu.widget) {
      const newLabel = prompt('Enter new label:', this.contextMenu.widget.label);
      if (newLabel !== null) {
        this.contextMenu.widget.label = newLabel;
      }
    }
    this.contextMenu.show = false;
  }

  deleteWidget() {
    if (this.contextMenu.widget) {
      const index = this.canvas.indexOf(this.contextMenu.widget);
      if (index > -1) {
        this.canvas.splice(index, 1);
      }
    }
    this.contextMenu.show = false;
  }

  saveLayout() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('uiBuilderLayout', JSON.stringify(this.canvas));
    }
  }

  exportLayout() {
    if (typeof window !== 'undefined') {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.canvas));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute('href', dataStr);
      downloadAnchorNode.setAttribute('download', 'layout.json');
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }
  }

  toggleSidebar() {
    this.sidebarMinimized = !this.sidebarMinimized;
  }

  selectWidget(widget: any) {
    this.selectedWidget = widget;
  }

  startDrag(event: MouseEvent, index: number) {
    this.draggingIndex = index;
    if (this.canvas[index].x === undefined) this.canvas[index].x = 0;
    if (this.canvas[index].y === undefined) this.canvas[index].y = 0;
    this.dragOffset = {
      x: event.clientX - this.canvas[index].x,
      y: event.clientY - this.canvas[index].y
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', this.onDragBound);
      window.addEventListener('mouseup', this.endDragBound);
    }
  }

  onDrag(event: MouseEvent) {
    if (this.draggingIndex !== null) {
      this.canvas[this.draggingIndex].x = event.clientX - this.dragOffset.x;
      this.canvas[this.draggingIndex].y = event.clientY - this.dragOffset.y;
    }
  }

  endDrag() {
    this.draggingIndex = null;
    if (typeof window !== 'undefined') {
      window.removeEventListener('mousemove', this.onDragBound);
      window.removeEventListener('mouseup', this.endDragBound);
    }
  }

  generateCode() {
    let html = '<div class="canvas">\n';
    for (const widget of this.canvas) {
      let style = `position:absolute;left:${widget.x}px;top:${widget.y}px;`;
      switch (widget.type) {
        case 'textbox':
          html += `<input type=\"text\" placeholder=\"Textbox\" style=\"${style}\">\n`;
          break;
        case 'checkbox':
          html += `<input type=\"checkbox\" style=\"${style}\">\n`;
          break;
        case 'radio':
          html += `<input type=\"radio\" style=\"${style}\">\n`;
          break;
        case 'button':
          html += `<button style=\"${style}\">Button</button>\n`;
          break;
        case 'dropdown':
          html += `<select style=\"${style}\">`;
          for (const option of widget.options || []) {
            html += `<option value=\"${option.value}\">${option.label}</option>`;
          }
          html += `</select>\n`;
          break;
        case 'textarea':
          html += `<textarea placeholder=\"Textarea\" style=\"${style}\"></textarea>\n`;
          break;
        case 'label':
          html += `<span style=\"${style}\">Label</span>\n`;
          break;
        // Add more widget types as needed
      }
    }
    html += '</div>';

    const css = `.canvas { position: relative; width: 900px; height: 600px; background: #fff; }\n`;
    const js = '';
    this.exportFile('ui-canvas.html', html);
    this.exportFile('ui-canvas.css', css);
    this.exportFile('ui-canvas.js', js);
  }

  exportFile(filename: string, content: string) {
    const dataStr = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', filename);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
}
