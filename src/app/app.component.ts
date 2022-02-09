import { Component, OnInit } from '@angular/core';
import { BrowserJsPlumbInstance } from '@jsplumb/browser-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'plumb';

  ngOnInit() {}
}
