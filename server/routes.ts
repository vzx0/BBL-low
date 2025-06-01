import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuizResponseSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Quiz response submission
  app.post("/api/quiz/submit", async (req, res) => {
    try {
      const quizData = insertQuizResponseSchema.parse(req.body);
      const response = await storage.createQuizResponse(quizData);
      res.json({ success: true, id: response.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          error: "Invalid quiz data", 
          details: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          error: "Failed to save quiz response" 
        });
      }
    }
  });

  // Get quiz responses by email
  app.get("/api/quiz/responses/:email", async (req, res) => {
    try {
      const { email } = req.params;
      const responses = await storage.getQuizResponsesByEmail(email);
      res.json({ success: true, responses });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch quiz responses" 
      });
    }
  });

  // Get quiz response by ID
  app.get("/api/quiz/response/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          error: "Invalid response ID" 
        });
      }

      const response = await storage.getQuizResponse(id);
      if (!response) {
        return res.status(404).json({ 
          success: false, 
          error: "Quiz response not found" 
        });
      }

      res.json({ success: true, response });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch quiz response" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
