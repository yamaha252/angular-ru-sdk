import { Injectable } from '@angular/core';
import { StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import { ngxsTestingPlatform } from '@angular-ru/ngxs/testing';
import { State, Store } from '@ngxs/store';

describe('AppState', () => {
    @StateRepository()
    @State({
        name: 'app',
        defaults: 'hello world'
    })
    @Injectable()
    class AppState extends NgxsDataRepository<string> {}

    it(
        'should be correct ensure state from AppState',
        ngxsTestingPlatform([AppState], (store: Store, app: AppState) => {
            expect(store.snapshot()).toEqual({ app: 'hello world' });
            expect(app.getState()).toEqual('hello world');
        })
    );

    it('Invalid state', async () => {
        class InvalidState {}
        let message: string | null = null;

        try {
            await ngxsTestingPlatform([InvalidState], () => {
                // ..
            })();
        } catch (e) {
            message = (e as Error).message;
        }

        expect(message).toEqual('InvalidState class must be decorated with @State() decorator');
    });
});