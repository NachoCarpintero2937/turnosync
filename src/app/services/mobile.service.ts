import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MobileService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  isMobile(): boolean {
    const anchoVentana = window.innerWidth;
    
    const anchoLimiteMovil = 768;

    return anchoVentana <= anchoLimiteMovil;
  }
}
