from flask import Flask, Blueprint, jsonify, request
from app.models import Jobposting, Skillset, Hiringmanager, db
import jwt
from datetime import datetime
import os

Jobposting_bp = Blueprint("Jobposting", __name__, url_prefix="/jobs")

@Jobposting_bp.route("/create", methods=['POST'])
def jobpost_create():
    try:
        data = request.get_json()
        token = request.headers.get("Authorization")
        decode = jwt.decode(token, os.environ.get("SECRET_KEY"), algorithms=['HS256'])
        hiring_manager_id = decode.get('id')

        # Check if the hiring manager exists
        hiring_manager = Hiringmanager.query.get(hiring_manager_id)
        if not hiring_manager:
            return jsonify({'message': 'Hiring Manager not found'}), 404

        # Extract skills from the data
        skills = data.get('skills', '').split(',')

        created_at = datetime.utcnow()

        # Create a new Jobposting instance
        new_job_posting = Jobposting(hiring_manager_id=hiring_manager_id, created_at=created_at, **data)

        # Query the skills from the Skillset model and add the relationship
        for skill_name in skills:
            skill = Skillset.query.filter_by(skills=skill_name).first()

            if not skill:
                skill = Skillset(skills=skill_name)
                db.session.add(skill)

            # Establish the relationship
            new_job_posting.skillsets.append(skill)

        # Add the new job posting to the database
        db.session.add(new_job_posting)
        db.session.commit()

        return jsonify({'message': 'Job posting created successfully'}), 201

    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired. Please log in again.'}), 401

    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token. Please log in again.'}), 401

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@Jobposting_bp.route("/created", methods=['GET'])
def get_jobs_created_by_hiring_manager():
    try:
        token = request.headers.get("Authorization")
        decode = jwt.decode(token, os.environ.get("SECRET_KEY"), algorithms=['HS256'])
        hiring_manager_id = decode.get('id')
        role = decode.get('role')

        if role != 'hiring_manager':
            return jsonify({'message': 'Unauthorized. Only hiring managers can view their created jobs'}), 401

        job_postings = Jobposting.query.filter_by(hiring_manager_id=hiring_manager_id).all()

        job_postings_data = []
        for job_posting in job_postings:
            job_posting_data = {
                'id': job_posting.id,
                'title': job_posting.title,
                'description': job_posting.description,
                'location': job_posting.location,
                'role': job_posting.role,
                'company_name': job_posting.company_name,
                'department': job_posting.department,
                'employment_type': job_posting.employment_type,
                'education': job_posting.education,
                'industry': job_posting.industry,
                'skills': job_posting.skills,
                'salary': job_posting.salary,
                'experience': job_posting.experience,
                'status': job_posting.status,
                'start_date': job_posting.start_date,
                'end_date': job_posting.end_date,
                'created_at': job_posting.created_at,
            }

            job_postings_data.append(job_posting_data)

        return jsonify({'job_postings': job_postings_data}), 200

    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired. Please log in again.'}), 401

    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token. Please log in again.'}), 401

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@Jobposting_bp.route("/get/<int:id>", methods=['GET'])
def get_single_job_posting(id):
    try:
        job_posting = Jobposting.query.get_or_404(id)
        data = {
            'id': job_posting.id,
            'title': job_posting.title,
            'description': job_posting.description,
            'location': job_posting.location,
            'role': job_posting.role,
            'company_name': job_posting.company_name,
            'department': job_posting.department,
            'employment_type': job_posting.employment_type,
            'education': job_posting.education,
            'industry': job_posting.industry,
            'skills': job_posting.skills,
            'salary': job_posting.salary,
            'experience': job_posting.experience,
            'status': job_posting.status,
            'start_date': job_posting.start_date,
            'end_date': job_posting.end_date,
            'hiring_manager_id': job_posting.hiring_manager_id,
            'created_at': job_posting.created_at,
        }

        return jsonify({'data': data}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@Jobposting_bp.route("/get/all", methods=['GET'])
def get_all_job_postings():
    try:
        job_postings = Jobposting.query.all()
        result = []

        for job_posting in job_postings:
            data = {
                'id': job_posting.id,
                'title': job_posting.title,
                'description': job_posting.description,
                'location': job_posting.location,
                'role': job_posting.role,
                'company_name': job_posting.company_name,
                'department': job_posting.department,
                'employment_type': job_posting.employment_type,
                'education': job_posting.education,
                'industry': job_posting.industry,
                'skills': job_posting.skills,
                'salary': job_posting.salary,
                'experience': job_posting.experience,
                'status': job_posting.status,
                'start_date': job_posting.start_date,
                'end_date': job_posting.end_date,
                'hiring_manager_id': job_posting.hiring_manager_id,
                'created_at': job_posting.created_at,
            }
            result.append(data)

        return jsonify({'data': result}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@Jobposting_bp.route("/update/<int:id>", methods=['PUT', 'PATCH'])
def update_job_posting(id):
    try:
        job_posting = Jobposting.query.get_or_404(id)
        data = request.get_json()
        token = request.headers.get("Authorization")
        decode = jwt.decode(token, os.environ.get("SECRET_KEY"), algorithms=['HS256'])
        hiring_manager_id = decode.get('id')
        role = decode.get('role')

        # Check if the hiring manager exists
        hiring_manager = Hiringmanager.query.get(hiring_manager_id)
        if not hiring_manager:
            return jsonify({'message': 'Hiring Manager not found'}), 404

        # Check if the user is a hiring manager
        if role != 'hiring_manager':
            return jsonify({'message': 'Unauthorized. Only hiring managers can update job postings'}), 401

        # Check if the current user is the owner of the job posting
        if job_posting.hiring_manager_id != hiring_manager_id:
            return jsonify({'message': 'Unauthorized. You are not the owner of this job posting'}), 403

        # Update the job posting fields
        for key, value in data.items():
            setattr(job_posting, key, value)

        # Update the associated skillsets
        skills = data.get('skills', '').split(',')
        job_posting.skillsets.clear()

        for skill_name in skills:
            skill = Skillset.query.filter_by(skills=skill_name).first()

            if not skill:
                skill = Skillset(skills=skill_name)
                db.session.add(skill)

            # Establish the relationship
            job_posting.skillsets.append(skill)

        db.session.commit()

        return jsonify({'message': 'Job posting updated successfully'}), 200

    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired. Please log in again.'}), 401

    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token. Please log in again.'}), 401

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@Jobposting_bp.route("/delete/<int:id>", methods=['DELETE'])
def delete_job_posting(id):
    try:
        job_posting = Jobposting.query.get_or_404(id)
        # data = request.get_json()
        token = request.headers.get("Authorization")
        decode = jwt.decode(token, os.environ.get("SECRET_KEY"), algorithms=['HS256'])
        hiring_manager_id = decode.get('id')
        role = decode.get('role')

        # Check if the hiring manager exists
        hiring_manager = Hiringmanager.query.get(hiring_manager_id)
        if not hiring_manager:
            return jsonify({'message': 'Hiring Manager not found'}), 404

        # Check if the user is a hiring manager
        if role != 'hiring_manager':
            return jsonify({'message': 'Unauthorized. Only hiring managers can delete job postings'}), 401

        # Check if the current user is the owner of the job posting
        if job_posting.hiring_manager_id != hiring_manager_id:
            return jsonify({'message': 'Unauthorized. You are not the owner of this job posting'}), 403

        db.session.delete(job_posting)
        db.session.commit()

        return jsonify({'message': 'Job posting deleted successfully'}), 200

    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired. Please log in again.'}), 401

    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token. Please log in again.'}), 401

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
