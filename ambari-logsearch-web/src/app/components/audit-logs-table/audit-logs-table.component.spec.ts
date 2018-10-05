/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {MomentModule} from 'angular2-moment';
import {MomentTimezoneModule} from 'angular-moment-timezone';
import {MockHttpRequestModules, TranslationModules} from '@app/test-config.spec';
import {AuditLogsService, auditLogs} from '@app/services/storage/audit-logs.service';
import {ServiceLogsService, serviceLogs} from '@app/services/storage/service-logs.service';
import {AuditLogsFieldsService, auditLogsFields} from '@app/services/storage/audit-logs-fields.service';
import {AuditLogsGraphDataService, auditLogsGraphData} from '@app/services/storage/audit-logs-graph-data.service';
import {ServiceLogsFieldsService, serviceLogsFields} from '@app/services/storage/service-logs-fields.service';
import {
  ServiceLogsHistogramDataService, serviceLogsHistogramData
} from '@app/services/storage/service-logs-histogram-data.service';
import {ServiceLogsTruncatedService, serviceLogsTruncated} from '@app/services/storage/service-logs-truncated.service';
import {AppStateService, appState} from '@app/services/storage/app-state.service';
import {AppSettingsService, appSettings} from '@app/services/storage/app-settings.service';
import {TabsService, tabs} from '@app/services/storage/tabs.service';
import {ClustersService, clusters} from '@app/services/storage/clusters.service';
import {ComponentsService, components} from '@app/services/storage/components.service';
import {HostsService, hosts} from '@app/services/storage/hosts.service';
import {LogsContainerService} from '@app/services/logs-container.service';
import {UtilsService} from '@app/services/utils.service';
import {PaginationComponent} from '@app/components/pagination/pagination.component';
import {DropdownListComponent} from '@modules/shared/components/dropdown-list/dropdown-list.component';

import {AuditLogsTableComponent} from './audit-logs-table.component';
import {ClusterSelectionService} from '@app/services/storage/cluster-selection.service';
import {RouterTestingModule} from '@angular/router/testing';
import {LogsStateService} from '@app/services/storage/logs-state.service';
import {RoutingUtilsService} from '@app/services/routing-utils.service';
import {LogsFilteringUtilsService} from '@app/services/logs-filtering-utils.service';
import {NotificationService} from '@modules/shared/services/notification.service';
import {NotificationsService} from 'angular2-notifications/src/notifications.service';

import { AuthService } from '@app/services/auth.service';
import * as auth from '@app/store/reducers/auth.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '@app/store/effects/auth.effects';
import { NotificationEffects } from '@app/store/effects/notification.effects';

describe('AuditLogsTableComponent', () => {
  let component: AuditLogsTableComponent;
  let fixture: ComponentFixture<AuditLogsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuditLogsTableComponent,
        PaginationComponent,
        DropdownListComponent
      ],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MomentModule,
        MomentTimezoneModule,
        ...TranslationModules,
        StoreModule.provideStore({
          auditLogs,
          serviceLogs,
          auditLogsFields,
          auditLogsGraphData,
          serviceLogsFields,
          serviceLogsHistogramData,
          serviceLogsTruncated,
          appState,
          appSettings,
          tabs,
          clusters,
          components,
          hosts,
          auth: auth.reducer
        }),
        EffectsModule.run(AuthEffects),
        EffectsModule.run(NotificationEffects)
      ],
      providers: [
        ...MockHttpRequestModules,
        LogsContainerService,
        UtilsService,
        AuditLogsService,
        ServiceLogsService,
        AuditLogsFieldsService,
        AuditLogsGraphDataService,
        ServiceLogsFieldsService,
        ServiceLogsHistogramDataService,
        ServiceLogsTruncatedService,
        AppStateService,
        AppSettingsService,
        TabsService,
        ClustersService,
        ComponentsService,
        HostsService,
        ClusterSelectionService,
        RoutingUtilsService,
        LogsFilteringUtilsService,
        LogsStateService,
        NotificationsService,
        NotificationService,
        AuthService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditLogsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('#getColumnByName()', () => {
    const cases = [
      {
        name: 'v1',
        result: {
          label: 'l1',
          value: 'v1'
        },
        title: 'item is present'
      },
      {
        name: 'l1',
        result: undefined,
        title: 'item is absent'
      }
    ];

    beforeEach(() => {
      component.columns = [
        {
          label: 'l0',
          value: 'v0'
        },
        {
          label: 'l1',
          value: 'v1'
        }
      ];
    });

    cases.forEach(test => {
      it(test.title, () => {
        expect(component.getColumnByName(test.name)).toEqual(test.result);
      });
    });
  });
});
