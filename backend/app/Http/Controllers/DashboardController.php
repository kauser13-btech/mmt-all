<?php

namespace App\Http\Controllers;

use App\Models\User;

class DashboardController extends Controller
{
    public function stats()
    {
        $totalUsers = User::count();
        $previousCount = max(0, $totalUsers - 951); // Simulate previous count
        $change = $totalUsers > 0 ? round((($totalUsers - $previousCount) / max(1, $previousCount)) * 100) : 0;

        return response()->json([
            [
                'name' => 'Total Users',
                'stat' => number_format($totalUsers),
                'icon' => 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
                'previousStat' => number_format($previousCount),
                'change' => $change . '%',
                'changeType' => $change >= 0 ? 'increase' : 'decrease'
            ]
        ]);
    }

    public function activity()
    {
        $recentUsers = User::latest()->take(5)->get();

        $activities = $recentUsers->map(function ($user) {
            return [
                'action' => 'New user registered',
                'user' => $user->name,
                'time' => $user->created_at->diffForHumans()
            ];
        });

        return response()->json($activities);
    }
}