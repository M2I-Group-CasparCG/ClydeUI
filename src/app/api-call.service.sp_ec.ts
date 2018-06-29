import { TestBed, inject } from '@angular/core/testing';
import { ApiCallService } from './api-call.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


describe('ApiCallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiCallService,
        HttpClient,
        HttpHeaders
      ]
    });
  });



const apiUrl = 'http://localhost:3000/api/v1';

  it('should be created', inject([ApiCallService], (service: ApiCallService) => {     
    expect(service).toBeTruthy();
  }));
});
