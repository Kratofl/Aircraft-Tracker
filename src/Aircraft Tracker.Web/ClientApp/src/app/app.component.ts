import { Component, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ChildrenOutletContexts, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { fade } from './modules/router-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [fade]
})
export class AppComponent {
  screenIsToSmall: boolean = false;

  constructor(private router: Router, private titleService: Title, private contexts: ChildrenOutletContexts) { }

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this.router.routerState.root;
          let routeTitle = '';
          while (route!.firstChild) {
            route = route.firstChild;
          }
          if (route.snapshot.data['title']) {
            routeTitle = route!.snapshot.data['title'];
          }
          return routeTitle;
        })
      )
      .subscribe((title: string) => {
        if (title) {
          this.titleService.setTitle(`${title} - Aircraft Tracker`);
        }
      });

    this.onResize();
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth <= 768) {
      this.screenIsToSmall = true;
    }
  }
}
