import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div class="text-center my-5">
      <img src="/assets/images/loading.gif" alt="Loading...">
    </div>
  `,
  styles: []
})
export class LoadingComponent {
}
