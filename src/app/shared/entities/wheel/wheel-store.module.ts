import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { WheelEffects } from './wheel-effects';
import { wheelStateReducer } from './wheel-reducer';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('wheel', wheelStateReducer),
        EffectsModule.forFeature([WheelEffects])
    ],
    providers: []
})
export class WheelStoreModule{}
