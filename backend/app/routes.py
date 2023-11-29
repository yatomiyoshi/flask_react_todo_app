# backend/app/routes.py
from flask import Blueprint, jsonify, request
from .models import Task
from . import db

api = Blueprint('api', __name__)

@api.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    task_list = [{'id': task.id, 'text': task.text} for task in tasks]
    return jsonify({'tasks': task_list})

@api.route('/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    new_task = Task(text=data['text'])
    db.session.add(new_task)
    db.session.commit()
    return jsonify({'message': 'Task added successfully'})

@api.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get(task_id)
    if task:
        db.session.delete(task)
        db.session.commit()
        return jsonify({'message': 'Task deleted successfully'})
    else:
        return jsonify({'message': 'Task not found'}), 404
