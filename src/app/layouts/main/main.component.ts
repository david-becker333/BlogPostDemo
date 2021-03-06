import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd, NavigationError } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  constructor(
     private router: Router,
     private titleService: Title
    ) {}

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
      let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'Home';
      if (routeSnapshot.firstChild) {
        title = this.getPageTitle(routeSnapshot.firstChild) || title;
      }
      return title;
    }
  
    ngOnInit() {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
         this.titleService.setTitle(this.getPageTitle(this.router.routerState.snapshot.root));
        }
        if (event instanceof NavigationError && event.error.status === 404) {
          this.router.navigate(['/404']);
        }
      });
    }
}
