import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from './base.service';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class NetSocialBaseService extends BaseService {

    constructor(
        protected http: HttpClient,
        protected prefix: string
    ) {
        super(http);
        // prefix of the controller that will call.
        let txtPrefix = '/';
        txtPrefix = txtPrefix.concat(prefix);
        // construct the url with the parameters of the services.
        // if not exist will be direct the path.
        this.baseUrl =  environment.API_URI + (prefix ? txtPrefix : '');
    }
}
