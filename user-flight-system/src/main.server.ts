import { renderApplication, provideServerRendering } from '@angular/platform-server';
import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

export function render(url: string, document: string): Promise<string> {
  return renderApplication(() =>
    bootstrapApplication(AppComponent, {
      ...appConfig,
      providers: [
        ...(appConfig.providers || []),
        provideServerRendering(),
        provideClientHydration()
      ],
    }),
    {
      document,
      url,
    }
  );
}
