"use client";

import { useEffect } from "react";

export default function Dashboard() {
  const user = {
    name: "Maria",
    xp: 340,
    maxXp: 500,
    league: "Silver",
    reports: 12,
    approved: 9,
  };

  const recentActivity = [
    { location: "BN1 4AA", progress: 75, xp: 15 },
    { location: "BN1 7TR", progress: 90, xp: 15 },
    { location: "BN2 1RP", progress: 40, xp: 20 },
  ];

  const progressPercentage = (user.xp / user.maxXp) * 100;
  const xpToNextLeague = user.maxXp - user.xp;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E6ECD0] to-[#C7D2A4] px-5 py-8">

      {/* Welcome Card */}
      <div className="max-w-md mx-auto bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/40">

        <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-[#D9E3B8] text-3xl mb-4">
          🏆
        </div>

        <h2 className="text-center text-xl font-semibold text-[#4A4F1E]">
          Welcome back, {user.name}
        </h2>

        <div className="mt-2 text-center">
          <span className="bg-[#D9E3B8] text-xs px-3 py-1 rounded-full font-medium text-[#4A4F1E]">
            {user.league.toUpperCase()} LEAGUE
          </span>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm text-[#4A4F1E] mb-2">
            <span>{user.xp} XP</span>
            <span>{user.maxXp} XP</span>
          </div>

          <div className="h-3 bg-white/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#4CAF50] transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <p className="text-center text-sm text-[#4A4F1E] mt-3">
            {xpToNextLeague} XP until Gold League — you are doing great!
          </p>
        </div>
      </div>

      {/* Impact */}
      <div className="max-w-md mx-auto mt-8 space-y-4">
        <h3 className="text-[#4A4F1E] font-semibold">Your Impact</h3>

        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 shadow-md">
          <h2 className="text-2xl font-bold text-[#4A4F1E]">
            {user.reports}
          </h2>
          <p className="text-sm text-[#4A4F1E]">Total Reports</p>
        </div>

        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 shadow-md">
          <h2 className="text-2xl font-bold text-[#4A4F1E]">
            {user.approved}
          </h2>
          <p className="text-sm text-[#4A4F1E]">Approved</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="max-w-md mx-auto mt-8 bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-xl">

        <h3 className="font-semibold text-[#4A4F1E] mb-4">
          Recent Activity
        </h3>

        {recentActivity.map((item, index) => (
          <div key={index} className="mb-5">

            <div className="flex justify-between text-sm text-[#4A4F1E]">
              <span>{item.location}</span>
              <span className="bg-[#D9E3B8] px-2 py-1 rounded-full text-xs">
                +{item.xp}
              </span>
            </div>

            <div className="mt-2 h-2 bg-white/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#4CAF50]"
                style={{ width: `${item.progress}%` }}
              />
            </div>

            <div className="text-xs text-[#4A4F1E] mt-1">
              {item.progress}%
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}