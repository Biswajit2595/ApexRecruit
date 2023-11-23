from flask import Flask, Blueprint, jsonify, request
from app.models import Application, Jobposting, Skillset, Hiringmanager,JobSeeker, db
import jwt
from datetime import datetime

Application_bp = Blueprint("Application", __name__, url_prefix="/applications")

@Application_bp.route("/apply/<int:job_posting_id>", methods=['POST'])
def apply_for_job(job_posting_id):
    try:
        data = request.get_json()
        token = request.headers.get("Authorization")
        decode = jwt.decode(token, 'secret_key', algorithms=['HS256'])
        jobseeker_id = decode.get('id')

        # Check if the job seeker exists
        job_seeker = JobSeeker.query.get(jobseeker_id)
        if not job_seeker:
            return jsonify({'message': 'Job Seeker not found'}), 404

        # Check if the job posting exists
        job_posting = Jobposting.query.get(job_posting_id)
        if not job_posting:
            return jsonify({'message': 'Job Posting not found'}), 404

        created_at = datetime.utcnow()
        # Create a new application instance
        new_application = Application(
            jobseeker_id=jobseeker_id, job_posting_id=job_posting_id, status='Applied', created_at=created_at
        )

        # Add the new application to the database
        db.session.add(new_application)
        db.session.commit()

        return jsonify({'message': 'Application submitted successfully'}), 201

    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired. Please log in again.'}), 401

    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token. Please log in again.'}), 401

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@Application_bp.route("/job/<int:job_posting_id>", methods=['GET'])
def get_applications_for_job(job_posting_id):
    try:
        job_posting = Jobposting.query.get_or_404(job_posting_id)
        token = request.headers.get("Authorization")
        decode = jwt.decode(token, 'secret_key', algorithms=['HS256'])
        user_id = decode.get('id')
        role = decode.get('role')

        # Check if the user is a hiring manager
        if role == 'hiring_manager':
            # Check if the hiring manager is the owner of the job posting
            if job_posting.hiring_manager_id != user_id:
                return jsonify({'message': 'Unauthorized. You are not the owner of this job posting'}), 403

        applications = Application.query.filter_by(job_posting_id=job_posting_id).all()

        application_data = []
        for application in applications:
            job_seeker_data = {
                'id': application.job_seeker_rel.id,
                'name': application.job_seeker_rel.username,
                'email': application.job_seeker_rel.email,
                'skills': application.job_seeker_rel.skills,
                'experience': application.job_seeker_rel.experience,
                # Add any other relevant details
            }

            application_data.append({
                'application_id': application.id,
                'status': application.status,
                'created_at': application.created_at,
                'job_seeker': job_seeker_data,
            })

        return jsonify({'applications': application_data}), 200

    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired. Please log in again.'}), 401

    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token. Please log in again.'}), 401

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@Application_bp.route("/update/<int:application_id>", methods=['PUT'])
def update_application_status(application_id):
    try:
        application = Application.query.get_or_404(application_id)
        data = request.get_json()
        token = request.headers.get("Authorization")
        decode = jwt.decode(token, 'secret_key', algorithms=['HS256'])
        hiring_manager_id = decode.get('id')
        role = decode.get('role')

        # Check if the hiring manager exists
        hiring_manager = Hiringmanager.query.get(hiring_manager_id)
        if not hiring_manager:
            return jsonify({'message': 'Hiring Manager not found'}), 404

        # Check if the user is a hiring manager
        if role != 'hiring_manager':
            return jsonify({'message': 'Unauthorized. Only hiring managers can update application status'}), 401

        # Check if the current user is the owner of the application
        if application.job_posting.hiring_manager_id != hiring_manager_id:
            return jsonify({'message': 'Unauthorized. You are not the owner of this application'}), 403

        # Update the application status
        application.status = data.get('status', application.status)

        db.session.commit()

        return jsonify({'message': 'Application status updated successfully'}), 200

    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired. Please log in again.'}), 401

    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token. Please log in again.'}), 401

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
@Application_bp.route("/get/<int:application_id>", methods=['GET'])
def get_single_application(application_id):
    try:
        token = request.headers.get("Authorization")
        decode = jwt.decode(token, 'secret_key', algorithms=['HS256'])
        user_id = decode.get('id')
        role = decode.get('role')

        # Check if the user is a hiring manager
        if role != 'hiring_manager':
            return jsonify({'message': 'Unauthorized. Only hiring managers can view application details'}), 403

        application = Application.query.get_or_404(application_id)

        # Check if the hiring manager is the owner of the application
        if application.job_posting.hiring_manager_id != user_id:
            return jsonify({'message': 'Unauthorized. You are not the owner of this application'}), 403

        job_seeker_data = {
            'id': application.job_seeker_rel.id,
            'name': application.job_seeker_rel.username,
            'email': application.job_seeker_rel.email,
            'skills': application.job_seeker_rel.skills,
            'experience': application.job_seeker_rel.experience,
        }

        application_data = {
            'id': application.id,
            'status': application.status,
            'created_at': application.created_at,
            'job_seeker': job_seeker_data,
        }

        return jsonify({'application': application_data}), 200

    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired. Please log in again.'}), 401

    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token. Please log in again.'}), 401

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@Application_bp.route("/delete/<int:application_id>", methods=['DELETE'])
def delete_application(application_id):
    try:
        token = request.headers.get("Authorization")
        decode = jwt.decode(token, 'secret_key', algorithms=['HS256'])
        hiring_manager_id = decode.get('id')
        role = decode.get('role')

        # Check if the user is a hiring manager
        if role != 'hiring_manager':
            return jsonify({'message': 'Unauthorized. Only hiring managers can delete applications'}), 401

        application = Application.query.get_or_404(application_id)

        # Check if the hiring manager is the owner of the application
        if application.job_posting.hiring_manager_id != hiring_manager_id:
            return jsonify({'message': 'Unauthorized. You are not the owner of this application'}), 403

        db.session.delete(application)
        db.session.commit()

        return jsonify({'message': 'Application deleted successfully'}), 200

    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired. Please log in again.'}), 401

    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token. Please log in again.'}), 401

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500