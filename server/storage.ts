import { quizResponses, type QuizResponse, type InsertQuizResponse } from "@shared/schema";

export interface IStorage {
  getQuizResponse(id: number): Promise<QuizResponse | undefined>;
  createQuizResponse(response: InsertQuizResponse): Promise<QuizResponse>;
  getQuizResponsesByEmail(email: string): Promise<QuizResponse[]>;
}

export class MemStorage implements IStorage {
  private quizResponses: Map<number, QuizResponse>;
  private currentId: number;

  constructor() {
    this.quizResponses = new Map();
    this.currentId = 1;
  }

  async getQuizResponse(id: number): Promise<QuizResponse | undefined> {
    return this.quizResponses.get(id);
  }

  async createQuizResponse(insertResponse: InsertQuizResponse): Promise<QuizResponse> {
    const id = this.currentId++;
    const response: QuizResponse = { 
      ...insertResponse, 
      id,
      createdAt: new Date()
    };
    this.quizResponses.set(id, response);
    return response;
  }

  async getQuizResponsesByEmail(email: string): Promise<QuizResponse[]> {
    return Array.from(this.quizResponses.values()).filter(
      (response) => response.email === email,
    );
  }
}

export const storage = new MemStorage();
