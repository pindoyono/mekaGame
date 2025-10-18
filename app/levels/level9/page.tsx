"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Pause, RotateCcw, Trophy, Gauge } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Challenge {
  id: number;
  title: string;
  description: string;
  setpoint: number;
  disturbanceEnabled: boolean;
  successCriteria: {
    maxError: number;
    settlingTime: number;
  };
}

const challenges: Challenge[] = [
  {
    id: 1,
    title: "Challenge 1: Kontrol Proporsional (P)",
    description:
      "Task: Atur suhu sistem ke 50°C menggunakan kontrol Proportional.\n\nDetail: Gunakan parameter Kp (Proportional) untuk mencapai setpoint. Set Kp antara 1.5-3.0, Ki=0, Kd=0. Process Value harus berada dalam ±2°C dari setpoint selama 30 detik.",
    setpoint: 50,
    disturbanceEnabled: false,
    successCriteria: {
      maxError: 2,
      settlingTime: 30,
    },
  },
  {
    id: 2,
    title: "Challenge 2: Kontrol PI (Proportional-Integral)",
    description:
      "Task: Capai setpoint 75°C dengan menghilangkan steady-state error.\n\nDetail: Gunakan Kp=2.0-4.0 dan Ki=0.2-0.5 untuk kontrol PI. Kd=0. Sistem harus mencapai setpoint dalam ±1.5°C dan bertahan 25 detik tanpa error steady-state.",
    setpoint: 75,
    disturbanceEnabled: false,
    successCriteria: {
      maxError: 1.5,
      settlingTime: 25,
    },
  },
  {
    id: 3,
    title: "Challenge 3: Kontrol PID Penuh",
    description:
      "Task: Pertahankan suhu 60°C dengan presisi tinggi menggunakan PID.\n\nDetail: Gunakan kombinasi Kp=2.5-3.5, Ki=0.3-0.5, Kd=0.1-0.3. Sistem harus stabil dalam ±1°C selama 20 detik. Derivative (Kd) akan mengurangi overshoot.",
    setpoint: 60,
    disturbanceEnabled: false,
    successCriteria: {
      maxError: 1,
      settlingTime: 20,
    },
  },
  {
    id: 4,
    title: "Challenge 4: PID dengan Gangguan",
    description:
      "Task: Pertahankan 50°C dengan adanya gangguan eksternal periodik.\n\nDetail: Sistem akan terpengaruh gangguan sinusoidal ±5°C. Gunakan Kp=3.0-4.0, Ki=0.4-0.6, Kd=0.2-0.4 untuk menolak gangguan. Pertahankan ±2°C selama 35 detik.",
    setpoint: 50,
    disturbanceEnabled: true,
    successCriteria: {
      maxError: 2,
      settlingTime: 35,
    },
  },
  {
    id: 5,
    title: "Challenge 5: Kontrol Presisi Maksimal",
    description:
      "Task: Capai dan pertahankan 80°C dengan presisi maksimal di kondisi gangguan.\n\nDetail: Ujian akhir! Gunakan fine-tuning PID: Kp=3.5-4.5, Ki=0.5-0.7, Kd=0.3-0.5. Pertahankan presisi ±0.8°C selama 30 detik dengan gangguan aktif. Ini membutuhkan tuning sempurna!",
    setpoint: 80,
    disturbanceEnabled: true,
    successCriteria: {
      maxError: 0.8,
      settlingTime: 30,
    },
  },
];

export default function Level9Page() {
  const router = useRouter();
  const { user, updateProgress } = useAuth();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  // PID Parameters
  const [kp, setKp] = useState(1.0);
  const [ki, setKi] = useState(0.1);
  const [kd, setKd] = useState(0.05);

  // Process Variables
  const [processValue, setProcessValue] = useState(25);
  const [setpoint, setSetpoint] = useState(challenges[0].setpoint);
  const [output, setOutput] = useState(0);
  const [error, setError] = useState(0);
  const [integralError, setIntegralError] = useState(0);
  const [previousError, setPreviousError] = useState(0);
  const [time, setTime] = useState(0);

  // History for graphing
  const [history, setHistory] = useState<
    { time: number; pv: number; sp: number; output: number }[]
  >([]);

  // Challenge tracking
  const [timeInRange, setTimeInRange] = useState(0);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);

  useEffect(() => {
    const challenge = challenges[currentChallenge];
    setSetpoint(challenge.setpoint);
  }, [currentChallenge]);

  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setTime((t) => {
        const newTime = t + 0.1;

        // Calculate PID control
        const currentError = setpoint - processValue;
        const newIntegralError = integralError + currentError * 0.1;
        const derivativeError = (currentError - previousError) / 0.1;

        const pidOutput =
          kp * currentError + ki * newIntegralError + kd * derivativeError;
        const constrainedOutput = Math.max(0, Math.min(100, pidOutput));

        // Simulate process
        const tau = 2.0;
        const gain = 1.0;
        const challenge = challenges[currentChallenge];
        const disturbance = challenge.disturbanceEnabled
          ? 5 * Math.sin(newTime * 0.5)
          : 0;

        const dvdt =
          (gain * constrainedOutput - processValue + disturbance) / tau;
        const newPV = processValue + dvdt * 0.1;

        setProcessValue(newPV);
        setOutput(constrainedOutput);
        setError(currentError);
        setIntegralError(newIntegralError);
        setPreviousError(currentError);

        setHistory((h) => {
          const newHistory = [
            ...h,
            {
              time: newTime,
              pv: newPV,
              sp: setpoint,
              output: constrainedOutput,
            },
          ];
          return newHistory.slice(-200);
        });

        if (Math.abs(currentError) <= challenge.successCriteria.maxError) {
          setTimeInRange((tir) => {
            const newTimeInRange = tir + 0.1;
            if (
              newTimeInRange >= challenge.successCriteria.settlingTime &&
              !challengeCompleted
            ) {
              setChallengeCompleted(true);
              setIsSimulating(false);
              setShowResult(true);

              if (!completedChallenges.includes(challenge.id)) {
                setCompletedChallenges([...completedChallenges, challenge.id]);
              }
            }
            return newTimeInRange;
          });
        } else {
          setTimeInRange(0);
        }

        return newTime;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [
    isSimulating,
    processValue,
    setpoint,
    kp,
    ki,
    kd,
    integralError,
    previousError,
    currentChallenge,
    challengeCompleted,
    completedChallenges,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#1e293b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 1;

    for (let i = 0; i <= 10; i++) {
      const x = (i / 10) * canvas.width;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    for (let i = 0; i <= 5; i++) {
      const y = (i / 5) * canvas.height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    if (history.length < 2) return;

    const maxTime = Math.max(...history.map((h) => h.time));
    const minTime = Math.max(0, maxTime - 20);

    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    history.forEach((point, i) => {
      if (point.time < minTime) return;
      const x = ((point.time - minTime) / 20) * canvas.width;
      const y = canvas.height - (point.sp / 100) * canvas.height;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 3;
    ctx.beginPath();
    history.forEach((point, i) => {
      if (point.time < minTime) return;
      const x = ((point.time - minTime) / 20) * canvas.width;
      const y = canvas.height - (point.pv / 100) * canvas.height;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2;
    ctx.beginPath();
    history.forEach((point, i) => {
      if (point.time < minTime) return;
      const x = ((point.time - minTime) / 20) * canvas.width;
      const y = canvas.height - (point.output / 100) * canvas.height;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    ctx.font = "12px monospace";
    ctx.fillStyle = "#fbbf24";
    ctx.fillText("Setpoint", 10, 20);
    ctx.fillStyle = "#10b981";
    ctx.fillText("Process Value", 10, 40);
    ctx.fillStyle = "#3b82f6";
    ctx.fillText("Output", 10, 60);
  }, [history]);

  const resetSimulation = () => {
    setIsSimulating(false);
    setProcessValue(25);
    setOutput(0);
    setError(0);
    setIntegralError(0);
    setPreviousError(0);
    setTime(0);
    setHistory([]);
    setTimeInRange(0);
    setChallengeCompleted(false);
  };

  const handleNextChallenge = () => {
    // Auto-save progress after each challenge
    const currentScore = (completedChallenges.length / challenges.length) * 100;
    const isPassed =
      completedChallenges.length >= Math.ceil(challenges.length * 0.6); // 60% = 3/5 challenges

    if (user) {
      updateProgress(10, currentScore, isPassed);
    }

    if (currentChallenge < challenges.length - 1) {
      // Close modal first
      setShowResult(false);

      // Reset simulation state
      setChallengeCompleted(false);
      setIsSimulating(false);
      setProcessValue(25);
      setOutput(0);
      setError(0);
      setIntegralError(0);
      setPreviousError(0);
      setTime(0);
      setHistory([]);
      setTimeInRange(0);

      // Move to next challenge
      setCurrentChallenge(currentChallenge + 1);
    } else {
      // Final save with 100% completion
      const finalScore = (completedChallenges.length / challenges.length) * 100;
      const finalPassed = completedChallenges.length >= challenges.length;
      if (user) {
        updateProgress(10, finalScore, finalPassed);
      }
      router.push("/");
    }
  };

  const handleSaveAndExit = () => {
    // Save current progress before exiting
    const currentScore = (completedChallenges.length / challenges.length) * 100;
    const isPassed =
      completedChallenges.length >= Math.ceil(challenges.length * 0.6); // 60% = 3/5 challenges

    if (user && completedChallenges.length > 0) {
      updateProgress(10, currentScore, isPassed);
    }
    router.push("/");
  };

  const challenge = challenges[currentChallenge];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleSaveAndExit}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
            Simpan & Keluar
          </button>
          <div className="flex items-center gap-3">
            <Gauge className="text-blue-400" size={32} />
            <h1 className="text-3xl font-bold">Level 10: Sistem Kontrol PID</h1>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Challenge</div>
            <div className="text-xl font-bold">
              {currentChallenge + 1} / {challenges.length}
            </div>
            <div className="text-xs text-green-400 mt-1">
              ✓ {completedChallenges.length} Selesai
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm rounded-xl p-6 mb-8 border-2 border-purple-500/50"
        >
          <h2 className="text-2xl font-bold mb-4 text-white">
            {challenge.title}
          </h2>
          <div className="space-y-3 mb-6">
            {challenge.description.split("\n\n").map((paragraph, index) => {
              const isTask = paragraph.startsWith("Task:");
              const isDetail = paragraph.startsWith("Detail:");

              if (isTask) {
                return (
                  <div
                    key={index}
                    className="bg-slate-900/70 rounded-lg p-4 border-l-4 border-yellow-400"
                  >
                    <div className="text-sm font-bold text-yellow-400 mb-1">
                      TASK
                    </div>
                    <div className="text-white font-medium">
                      {paragraph.replace("Task:", "").trim()}
                    </div>
                  </div>
                );
              }

              if (isDetail) {
                return (
                  <div
                    key={index}
                    className="bg-slate-900/70 rounded-lg p-4 border-l-4 border-blue-400"
                  >
                    <div className="text-sm font-bold text-blue-400 mb-1">
                      DETAIL
                    </div>
                    <div className="text-gray-200 text-sm leading-relaxed">
                      {paragraph.replace("Detail:", "").trim()}
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-sm text-gray-400">Setpoint</div>
              <div className="text-2xl font-bold text-yellow-400">
                {challenge.setpoint}°C
              </div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-sm text-gray-400">Max Error</div>
              <div className="text-2xl font-bold text-orange-400">
                ±{challenge.successCriteria.maxError}°C
              </div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-sm text-gray-400">Settling Time</div>
              <div className="text-2xl font-bold text-purple-400">
                {challenge.successCriteria.settlingTime}s
              </div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-sm text-gray-400">Gangguan</div>
              <div className="text-2xl font-bold text-red-400">
                {challenge.disturbanceEnabled ? "Ya" : "Tidak"}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold mb-4">Parameter PID</h3>

              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">
                    Proportional (Kp)
                  </label>
                  <span className="text-sm font-mono bg-slate-900 px-2 py-1 rounded">
                    {kp.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={kp}
                  onChange={(e) => setKp(parseFloat(e.target.value))}
                  className="w-full"
                  disabled={isSimulating}
                />
              </div>

              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Integral (Ki)</label>
                  <span className="text-sm font-mono bg-slate-900 px-2 py-1 rounded">
                    {ki.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.01"
                  value={ki}
                  onChange={(e) => setKi(parseFloat(e.target.value))}
                  className="w-full"
                  disabled={isSimulating}
                />
              </div>

              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Derivative (Kd)</label>
                  <span className="text-sm font-mono bg-slate-900 px-2 py-1 rounded">
                    {kd.toFixed(3)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.001"
                  value={kd}
                  onChange={(e) => setKd(parseFloat(e.target.value))}
                  className="w-full"
                  disabled={isSimulating}
                />
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setIsSimulating(!isSimulating)}
                  className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                    isSimulating
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {isSimulating ? <Pause size={20} /> : <Play size={20} />}
                  {isSimulating ? "Pause" : "Start"} Simulasi
                </button>
                <button
                  onClick={resetSimulation}
                  className="w-full py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <RotateCcw size={20} />
                  Reset
                </button>
              </div>

              <div className="mt-6 space-y-3">
                <div className="bg-slate-900/50 rounded-lg p-3">
                  <div className="text-sm text-gray-400">Process Value</div>
                  <div className="text-2xl font-bold text-green-400">
                    {processValue.toFixed(2)}°C
                  </div>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-3">
                  <div className="text-sm text-gray-400">Error</div>
                  <div className="text-2xl font-bold text-orange-400">
                    {error.toFixed(2)}°C
                  </div>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-3">
                  <div className="text-sm text-gray-400">Output</div>
                  <div className="text-2xl font-bold text-blue-400">
                    {output.toFixed(2)}%
                  </div>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-3">
                  <div className="text-sm text-gray-400">Time in Range</div>
                  <div className="text-2xl font-bold text-purple-400">
                    {timeInRange.toFixed(1)}s
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold mb-4">Grafik Real-time</h3>
              <canvas
                ref={canvasRef}
                width={800}
                height={400}
                className="w-full rounded-lg border border-slate-600"
              />
              <div className="mt-4 text-sm text-gray-400">
                <p>Grafik menampilkan 20 detik terakhir dari simulasi.</p>
                <p>
                  Sistem berhasil jika Process Value berada dalam range error
                  maksimal selama {challenge.successCriteria.settlingTime}{" "}
                  detik.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold mb-4">Progress Challenge</h3>
          <div className="flex gap-2">
            {challenges.map((c, i) => (
              <div
                key={c.id}
                className={`flex-1 h-3 rounded-full transition-all ${
                  completedChallenges.includes(c.id)
                    ? "bg-green-500"
                    : i === currentChallenge
                    ? "bg-blue-500 animate-pulse"
                    : "bg-slate-700"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {showResult && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-800 rounded-xl p-8 max-w-md w-full border-2 border-green-500"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="text-green-400" size={40} />
              </div>
              <h2 className="text-3xl font-bold mb-2 text-green-400">
                Challenge Selesai!
              </h2>
              <p className="text-gray-300 mb-6">
                Anda berhasil menyelesaikan {challenge.title}
              </p>
              <div className="space-y-2 mb-6 text-left bg-slate-900/50 rounded-lg p-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Final PV:</span>
                  <span className="font-mono font-bold">
                    {processValue.toFixed(2)}°C
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Final Error:</span>
                  <span className="font-mono font-bold">
                    {Math.abs(error).toFixed(2)}°C
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Settling Time:</span>
                  <span className="font-mono font-bold">
                    {timeInRange.toFixed(1)}s
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">PID Tuning:</span>
                  <span className="font-mono font-bold text-xs">
                    Kp={kp.toFixed(2)} Ki={ki.toFixed(2)} Kd={kd.toFixed(3)}
                  </span>
                </div>
              </div>
              <button
                onClick={handleNextChallenge}
                className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
              >
                {currentChallenge < challenges.length - 1
                  ? "Challenge Selanjutnya"
                  : "Selesai"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
