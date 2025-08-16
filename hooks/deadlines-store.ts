import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import createContextHook from "@nkzw/create-context-hook";
import { Deadline } from "@/types";
import { mockDeadlines } from "@/mocks/data";

export const [DeadlinesProvider, useDeadlines] = createContextHook(() => {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadDeadlines = async () => {
      try {
        const storedDeadlines = await AsyncStorage.getItem("deadlines");
        if (storedDeadlines) {
          setDeadlines(JSON.parse(storedDeadlines));
        } else {
          // Initialize with mock data for demo
          setDeadlines(mockDeadlines);
          await AsyncStorage.setItem("deadlines", JSON.stringify(mockDeadlines));
        }
      } catch (error) {
        console.error("Error loading deadlines:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDeadlines();
  }, []);

  const addDeadline = async (deadline: Omit<Deadline, "id" | "isCompleted">) => {
    try {
      const newDeadline: Deadline = {
        ...deadline,
        id: `deadline${Date.now()}`,
        isCompleted: false,
      };
      
      const updatedDeadlines = [...deadlines, newDeadline];
      setDeadlines(updatedDeadlines);
      await AsyncStorage.setItem("deadlines", JSON.stringify(updatedDeadlines));
      return { success: true };
    } catch (error) {
      console.error("Add deadline error:", error);
      return { success: false, error: "Failed to add deadline" };
    }
  };

  const toggleDeadlineCompletion = async (id: string) => {
    try {
      const updatedDeadlines = deadlines.map(deadline => 
        deadline.id === id 
          ? { ...deadline, isCompleted: !deadline.isCompleted } 
          : deadline
      );
      
      setDeadlines(updatedDeadlines);
      await AsyncStorage.setItem("deadlines", JSON.stringify(updatedDeadlines));
      return { success: true };
    } catch (error) {
      console.error("Toggle deadline error:", error);
      return { success: false, error: "Failed to update deadline" };
    }
  };

  const removeDeadline = async (id: string) => {
    try {
      const updatedDeadlines = deadlines.filter(deadline => deadline.id !== id);
      setDeadlines(updatedDeadlines);
      await AsyncStorage.setItem("deadlines", JSON.stringify(updatedDeadlines));
      return { success: true };
    } catch (error) {
      console.error("Remove deadline error:", error);
      return { success: false, error: "Failed to remove deadline" };
    }
  };

  const getUpcomingDeadlines = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return deadlines
      .filter(deadline => {
        const deadlineDate = new Date(deadline.date);
        deadlineDate.setHours(0, 0, 0, 0);
        return !deadline.isCompleted && deadlineDate >= today;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  return {
    deadlines,
    isLoading,
    addDeadline,
    toggleDeadlineCompletion,
    removeDeadline,
    getUpcomingDeadlines,
  };
});
