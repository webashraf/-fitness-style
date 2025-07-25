"use client";

import Image from "next/image";
import React, { useState } from "react";
import DynamicModal from "../shared/DynamicModal";

const WorkoutPage = () => {
  const [workouts, setWorkouts] = useState([
    {
      id: 1,
      title: "Skills Workout - 1",
      subtitle: "Shooting Form",
      image: "/images/auth/basket_ball1.png",
    },
    {
      id: 2,
      title: "Skills Workout - 2",
      subtitle: "Dribbling",
      image: "/images/auth/basket_ball2.png",
    },
    {
      id: 3,
      title: "Strength Training",
      subtitle: "Core Focused",
      image: "/images/auth/basket_ball3.png",
    },
  ]);

  const [editingWorkout, setEditingWorkout] = useState<null | {
    id: number;
    title: string;
    subtitle: string;
  }>(null);

  const [newTitle, setNewTitle] = useState("");
  const [newSubtitle, setNewSubtitle] = useState("");

  const handleDelete = (id: number) => {
    setWorkouts((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEditClick = (
    id: number,
    currentTitle: string,
    currentSubtitle: string
  ) => {
    setEditingWorkout({ id, title: currentTitle, subtitle: currentSubtitle });
    setNewTitle(currentTitle);
    setNewSubtitle(currentSubtitle);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWorkout) return;

    setWorkouts((prev) =>
      prev.map((item) =>
        item.id === editingWorkout.id
          ? { ...item, title: newTitle, subtitle: newSubtitle }
          : item
      )
    );
    setEditingWorkout(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {workouts.map((workout) => (
        <div
          key={workout.id}
          className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden shadow-lg transition hover:scale-[1.01] hover:shadow-xl"
        >
          <div className="relative h-64 w-full">
            <Image
              src={workout.image}
              alt={`${workout.title} workout preview`}
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-white/0 backdrop-blur-md text-white">
            <h3 className="text-xl font-semibold">{workout.title}</h3>
            <p className="!text-md leading-0 text-gray-200">
              {workout.subtitle}
            </p>
          </div>

          <div className="flex justify-center items-center gap-10 py-8 bg-white/10 backdrop-blur-sm border-t border-white/20">
            <button
              type="button"
              onClick={() => handleDelete(workout.id)}
              className="!text-brand-primary border border-brand-primary font-semibold px-10 py-3 rounded hover:bg-white/20 transition"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() =>
                handleEditClick(workout.id, workout.title, workout.subtitle)
              }
              className="bg-brand-primary !text-white px-10 py-3 rounded hover:bg-green-800 transition"
            >
              Edit
            </button>
          </div>
        </div>
      ))}

      {/* Edit Modal */}
      <DynamicModal
        isOpen={!!editingWorkout}
        onClose={() => setEditingWorkout(null)}
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subtitle
            </label>
            <input
              type="text"
              value={newSubtitle}
              onChange={(e) => setNewSubtitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={() => setEditingWorkout(null)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-brand-primary text-white rounded hover:bg-green-800"
            >
              Save
            </button>
          </div>
        </form>
      </DynamicModal>
    </div>
  );
};

export default WorkoutPage;
