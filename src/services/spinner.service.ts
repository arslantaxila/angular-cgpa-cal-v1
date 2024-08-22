import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { finalize, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private renderer: Renderer2;
  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.renderer.addClass(document.body, 'loading');
    return next
      .handle(req)
      .pipe(
        finalize(() => this.renderer.removeClass(document.body, 'loading'))
      );
  }
}
