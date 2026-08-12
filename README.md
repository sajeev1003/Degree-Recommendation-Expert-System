Explainable Degree Recommendation Expert System

EXPERTOS is a browser-based expert system that helps prospective university students explore degree programmes suited to their academic strengths, interests, personality traits, and study preferences.

Instead of returning an unexplained answer, the system applies a structured knowledge base and forward-chaining inference to rank suitable programmes and show the reasoning behind each recommendation.

Why This Project?

Choosing a university programme requires students to consider several factors at once. Search engines can provide information, but they do not reason about how a student's characteristics relate to different fields of study.

EXPERTOS models that decision process as an explainable rule-based system. It converts assessment responses into facts, evaluates relevant production rules, scores degree profiles, and presents ranked recommendations that users can understand.

Core Capabilities

Guided assessment covering academic strengths, interests, personality, and preferences

Knowledge base containing 40 IF-THEN production rules

Degree profiles represented as structured frames

Forward-chaining inference over collected user facts

Semantic relationships connecting related traits and study domains

Ranked degree recommendations based on accumulated evidence

Explanation facility showing why a programme was recommended

Responsive React interface for desktop and mobile browsers

Reasoning Flow

flowchart TD
    A[Student assessment] --> B[Answers converted into facts]
    B --> C[Forward-chaining inference]
    D[Rules, frames, and semantic links] --> C
    C --> E[Degree scores and matched evidence]
    E --> F[Ranked recommendations with explanations]

The inference process follows four main stages:

Collect facts: The questionnaire captures the student's attributes and preferences.

Match conditions: The engine checks which rule conditions are satisfied.

Fire rules: Matching rules contribute evidence and scores to relevant degree profiles.

Explain results: The highest-scoring programmes are presented together with their supporting reasons.

Knowledge Representation

Component

Purpose

Production rules

Express domain knowledge as IF-THEN relationships

Degree frames

Store the defining characteristics of each programme

Semantic relationships

Connect related interests, traits, skills, and disciplines

Working facts

Represent answers gathered during the assessment

Inference engine

Matches facts to rules and calculates recommendation scores

The rules are separated by domain to keep the knowledge base readable and maintainable:

Academic rules

Interest rules

Personality rules

General recommendation rules

Technology Stack

Area

Technologies

Frontend

React, TypeScript, JavaScript

Styling

CSS

Build tooling

Vite

Reasoning

Custom forward-chaining inference engine

Knowledge base

Modular JavaScript rule and frame definitions

Project Structure

Degree-Recommendation-Expert-System/
├── docs/                         # Knowledge elicitation, design, and evaluation notes
├── frontend/
│   ├── public/                   # Public web assets
│   ├── src/
│   │   ├── components/           # Assessment, layout, and result components
│   │   ├── engine/               # Forward-chaining inference engine
│   │   ├── kb/                   # Rules, degree frames, questions, and semantics
│   │   ├── pages/                # Landing, questionnaire, and results pages
│   │   └── lib/                  # Shared TypeScript definitions
│   ├── package.json
│   └── vite.config.ts
├── LICENSE
└── README.md

Run Locally

Prerequisites

Node.js

npm

Installation

git clone https://github.com/sajeev1003/Degree-Recommendation-Expert-System.git
cd Degree-Recommendation-Expert-System/frontend
npm install
npm run dev

Open the local address printed by Vite, normally http://localhost:5173.

Production Build

cd frontend
npm run build

The optimized site is generated in frontend/dist/.

Evaluation

The project documentation includes the knowledge-elicitation process, expert consultation, component design, test planning, and result analysis. During the documented evaluation, the system produced valid recommendations for all eight user profiles, with six matching the expected programme exactly.

Documentation

Additional material is available in docs/, including:

Expert consultation and knowledge elicitation

Knowledge-base and component design

Testing plan and evaluation results

Supporting analysis for the expert-system approach

Project Context

This project was developed for the WID2001 Knowledge Representation and Reasoning course and supports SDG 4: Quality Education by helping students make more informed higher-education choices.

Maintainer

Sajeev Jayaparagasam

License

This project is distributed under the MIT License. See LICENSE for details.
