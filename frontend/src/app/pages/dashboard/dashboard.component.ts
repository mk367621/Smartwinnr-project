import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  totalUsers = 0;
  totalOrders = 0;
  totalSales = 0;

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.adminService.getMetrics().subscribe({
      next: (data) => {
        console.log('Metrics RAW:', data);

        this.totalUsers = data.metrics.totalUsers;
        this.totalOrders = data.metrics.totalOrders;
        this.totalSales = data.metrics.totalSales;
        this.cdr.detectChanges();

        console.log('AFTER ASSIGNMENT:', this.totalUsers, this.totalOrders, this.totalSales);
      },

      error: (err) => {
        console.error('Metrics error:', err);
      },
    });
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}
