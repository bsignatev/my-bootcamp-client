import {EventEmitter, Component, ViewEncapsulation, Input, Output} from '@angular/core';
import {SvgUrlResolverService} from '../../services';

export enum SearchComponentActions {
  search,
  open,
  close
}

@Component({
  selector: 'search-input',
  styleUrls: ['./styles.css'],
  templateUrl: './template.html',
  encapsulation: ViewEncapsulation.Emulated,
})
export class SearchInput {
  @Input() query: string;
  @Output() action = new EventEmitter(false);

  opened: boolean = false;
  active: boolean = false;

  constructor(private svgUrlResolver: SvgUrlResolverService) {
  }

  open() {
    this.action.emit({
      type: SearchComponentActions.open
    });
    this.opened = true;
    if (this.opened){
      this.search(this.query);
    }
  }

  close() {
    this.action.emit({type: SearchComponentActions.close});
    this.opened = false;
    this.active = false;
    this.query = '';
    this.action.emit({type: SearchComponentActions.search, payload: this.query});
  }

  search(query: string) {
    this.action.emit({type: SearchComponentActions.close});
    this.opened = false;
    this.active = !!query.length;
    this.action.emit({type: SearchComponentActions.search, payload: query});
  }
}
