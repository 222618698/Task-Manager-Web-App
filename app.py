"""
Task Manager - Flask REST API
A simple RESTful API for managing tasks with CRUD operations.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import uuid

app = Flask(__name__)
CORS(app)

# In-memory task storage
tasks = []


def find_task(task_id):
    """Find a task by its ID."""
    return next((task for task in tasks if task["id"] == task_id), None)


@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    """Get all tasks. Supports optional ?status=pending|completed filter."""
    status = request.args.get("status")
    if status:
        filtered = [t for t in tasks if t["status"] == status]
        return jsonify(filtered), 200
    return jsonify(tasks), 200


@app.route("/api/tasks/<string:task_id>", methods=["GET"])
def get_task(task_id):
    """Get a single task by ID."""
    task = find_task(task_id)
    if task is None:
        return jsonify({"error": "Task not found"}), 404
    return jsonify(task), 200


@app.route("/api/tasks", methods=["POST"])
def create_task():
    """Create a new task."""
    data = request.get_json()
    if not data or not data.get("title"):
        return jsonify({"error": "Title is required"}), 400

    task = {
        "id": str(uuid.uuid4()),
        "title": data["title"],
        "description": data.get("description", ""),
        "status": data.get("status", "pending"),
        "priority": data.get("priority", "medium"),
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat(),
    }
    tasks.append(task)
    return jsonify(task), 201


@app.route("/api/tasks/<string:task_id>", methods=["PUT"])
def update_task(task_id):
    """Update an existing task."""
    task = find_task(task_id)
    if task is None:
        return jsonify({"error": "Task not found"}), 404

    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    task["title"] = data.get("title", task["title"])
    task["description"] = data.get("description", task["description"])
    task["status"] = data.get("status", task["status"])
    task["priority"] = data.get("priority", task["priority"])
    task["updated_at"] = datetime.utcnow().isoformat()

    return jsonify(task), 200


@app.route("/api/tasks/<string:task_id>", methods=["DELETE"])
def delete_task(task_id):
    """Delete a task by ID."""
    task = find_task(task_id)
    if task is None:
        return jsonify({"error": "Task not found"}), 404

    tasks.remove(task)
    return jsonify({"message": "Task deleted successfully"}), 200


@app.route("/api/tasks/stats", methods=["GET"])
def get_stats():
    """Get task statistics."""
    total = len(tasks)
    completed = sum(1 for t in tasks if t["status"] == "completed")
    pending = sum(1 for t in tasks if t["status"] == "pending")
    high_priority = sum(1 for t in tasks if t["priority"] == "high")
    medium_priority = sum(1 for t in tasks if t["priority"] == "medium")
    low_priority = sum(1 for t in tasks if t["priority"] == "low")

    return jsonify({
        "total": total,
        "completed": completed,
        "pending": pending,
        "high_priority": high_priority,
        "medium_priority": medium_priority,
        "low_priority": low_priority,
    }), 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)
