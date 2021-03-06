/**
 * Created by liuzheng on 4/7/16.
 */

import {Component} from '@angular/core';
import {NgClass}    from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {Logger} from "angular2-logger/core";

import  'rxjs/Rx';
declare var jQuery:any;
declare var Clipboard:any;
declare var layer:any;


import {AppService, DataStore} from './service'


//noinspection TypeScriptValidateTypes
@Component({
    selector: 'nav',
    template: `<div class="nav" *ngIf="DataStore.logined">
    <ul>
        <li><a [routerLink]="['Index']"><img src="./imgs/logo.png" height="26px"/></a>
        </li>
        <li *ngFor="let v of DataStore.Nav; let k = index " [ngClass]="{'dropdown': v.children}">
            <a>{{v.name}}</a>
            <ul [ngClass]="{'dropdown-content': v.children}">
                <li *ngFor="let vv of v.children; let kk = index" [ngClass]="{'disabled': vv.disable}">
                    <a *ngIf="vv.href" [routerLink]="[vv.href]">{{vv.name}}</a>
                    <a id="{{vv.id}}" *ngIf="vv.click" (click)="click(vv.click)">{{vv.name}}</a>
                </li>
            </ul>
        </li>
    </ul>
</div>`,
    directives: [ROUTER_DIRECTIVES, NgClass]
})


export class NavComponent {
    DataStore = DataStore;

    constructor(private _appService:AppService,
                private _logger:Logger) {
        this._logger.log('nav.ts:NavComponent');
        this._appService.getnav()
    }

    ngOnInit() {

    }

    click(event) {
        this._logger.debug('nav.ts:NavComponent,click', event);
        if (event === "ReloadLeftbar") {
            this._appService.ReloadLeftbar()
        } else if (event === "HideLeft") {
            this._appService.HideLeft()
        } else if (event === "ShowLeft") {
            this._appService.ShowLeft()
        } else if (event === "Copy") {
            this._appService.copy()
        } else if (event === "Disconnect") {
            this._appService.TerminalDisconnect(DataStore.termActive)
        } else if (event === "DisconnectAll") {
            this._appService.TerminalDisconnectAll()
        } else if (event === "Website") {
            window.open('http://www.jumpserver.org')
        } else if (event === "BBS") {
            window.open('http://bbs.jumpserver.org')
        } else if (event === "EnterLicense") {
            this.EnterLicense()
        }
    }

    EnterLicense() {
        layer.prompt({
            formType: 2,
            maxlength: 500,
            title: 'Please Input Code',
            scrollbar: false,
            area: ['400px', '300px'],
            moveOut: true,
            moveType: 1
        }, function (value, index) {
            DataStore.socket.emit('key', value);
            // layer.msg(value); //得到value
            layer.close(index);

        });
    }


}
