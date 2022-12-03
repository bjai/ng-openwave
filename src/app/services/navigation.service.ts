import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class NavigationService implements OnInit {

    private showNav$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private router: Router) {
        router.events.subscribe(() => {
            this.setShowNav(false);
        });
    }

    ngOnInit() {
    }

    getShowNav() {
        return this.showNav$.asObservable();
    }

    setShowNav(showHide: boolean) {
        console.log(showHide, 'setShowNav')
        this.showNav$.next(showHide);
    }

    toggleNavState() {
        this.showNav$.next(!this.showNav$.value);
    }

    isNavOpen() {
        return this.showNav$.value;
    }
}
