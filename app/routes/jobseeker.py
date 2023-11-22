from flask import Blueprint,jsonify,request
from app.models import JobSeeker,Skillset,db
from flask_bcrypt import Bcrypt
import jwt
from datetime import datetime

Jobseeker_bp=Blueprint('jobseeker',__name__,url_prefix='/jobseekers')
bcrypt=Bcrypt()


@Jobseeker_bp.route('/signup',methods=["POST"])
def jobseeker_signup():
    data=request.get_json()
    exist=JobSeeker.query.all()
    
    for user in exist:
        if data['email']==user.email:
            return jsonify({'msg':"User is already registered please login"})
    
    hashed=bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    
    new_jobseeker=JobSeeker(username= data["username"],
            email= data["email"],
            password= hashed,  # You should hash the password before storing it
            experience= data["experience"],
            bio= data["bio"],
            status= data["status"],
            availability= data["availability"],
            address= data["address"],
            created_at= datetime.now()
            )

    skillsets=[]
    for skill in data['skillsets']:
        skillset=Skillset(skills=skill)
        skillsets.append(skillset)
        db.session.add(skillset)
        
    new_jobseeker.skillsets=skillsets
    
    db.session.add(new_jobseeker)
    db.session.commit()
    
    return jsonify({'msg':"User registered successfully"}),201

@Jobseeker_bp.route("/login",methods=["POST"])
def jobseeker_login():
    data=request.get_json()
    email=data['email']
    password=data['password']
    
    jobseeker=JobSeeker.query.filter_by(email=email).first()
    
    if jobseeker.email==email and bcrypt.check_password_hash(jobseeker.password,password):
        token=jwt.encode({'email':jobseeker.email,'role':"jobseeker","id":jobseeker.id},"secret_key",algorithm='HS256')
        return jsonify({'msg':"Logged in Successfully",'token':token})
    else:
        return jsonify({"msg":"Wrong Credentials. Please try again "})


@Jobseeker_bp.route('/profile/<int:jobseeker_id>', methods=['GET'])
def get_jobseeker_profile(jobseeker_id):
    jobseeker = JobSeeker.query.get_or_404(jobseeker_id)

    # Access the skills of the job seeker
    skills = [skill.skills for skill in jobseeker.skillsets]

    # You can include other profile information as needed
    profile_data = {
        'username': jobseeker.username,
        'email': jobseeker.email,
        'experience': jobseeker.experience,
        'bio': jobseeker.bio,
        'status': jobseeker.status,
        'availability': jobseeker.availability,
        'address': jobseeker.address,
        'skills': skills
    }

    return jsonify({"msg": "User Details", "data": profile_data})


@Jobseeker_bp.route('/update/<int:jobseeker_id>', methods=['PUT','PATCH'])
def update_jobseeker(jobseeker_id):
    jobseeker = JobSeeker.query.get(jobseeker_id)

    if not jobseeker:
        return jsonify({'message': 'Job Seeker not found'}), 404

    data = request.get_json()

    for key, value in data.items():
        # Use setattr to dynamically set attributes based on the request data
        setattr(jobseeker, key, value)

    db.session.commit()

    return jsonify({'message': 'Job Seeker updated successfully'})


@Jobseeker_bp.route('delete/<int:jobseeker_id>', methods=['DELETE'])
def delete_jobseeker(jobseeker_id):
    jobseeker = JobSeeker.query.get_or_404(jobseeker_id)
    db.session.delete(jobseeker)
    db.session.commit()

    return jsonify(message='Job Seeker deleted successfully')
