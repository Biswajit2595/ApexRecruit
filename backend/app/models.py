
from .extension import db


class JobSeeker(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(200), nullable=False)
    experience = db.Column(db.String(250), nullable=False)
    bio = db.Column(db.Text)
    skills = db.Column(db.Text)
    status = db.Column(db.Boolean)
    availability = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(250), nullable=False)
    created_at = db.Column(db.TIMESTAMP)
    applications_rel = db.relationship('Application', back_populates='job_seeker_rel', lazy=True)

class Jobposting(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), nullable=False)
    description = db.Column(db.String(250), nullable=False)
    location = db.Column(db.String(250), nullable=False)
    role = db.Column(db.String(250), nullable=False)
    company_name = db.Column(db.String(250), nullable=False)
    department = db.Column(db.String(250), nullable=False)
    employment_type = db.Column(db.String(250), nullable=False)
    education = db.Column(db.String(250), nullable=False)
    industry = db.Column(db.String(250), nullable=False)
    skills = db.Column(db.String(250), nullable=False)
    salary = db.Column(db.String(250), nullable=False)
    experience = db.Column(db.String(250), nullable=False)
    status = db.Column(db.String(250), nullable=False)
    start_date = db.Column(db.String(250), nullable=False)
    end_date = db.Column(db.String(250), nullable=False)
    hiring_manager_id = db.Column(db.Integer, db.ForeignKey('hiringmanager.id'))
    created_at = db.Column(db.TIMESTAMP)
    applications = db.relationship('Application', back_populates='job_posting')
    skillsets = db.relationship('Skillset', secondary='jobposting_skillset_association', back_populates='job_postings')

class Skillset(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    skills = db.Column(db.String(250), nullable=False)
    job_postings = db.relationship('Jobposting', secondary='jobposting_skillset_association', back_populates='skillsets')

# Define the association table with lowercase table names
jobposting_skillset_association = db.Table('jobposting_skillset_association',
    db.Column('jobposting_id', db.Integer, db.ForeignKey('jobposting.id')),
    db.Column('skillset_id', db.Integer, db.ForeignKey('skillset.id'))
)

class Hiringmanager(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(200), nullable=False)
    company_name = db.Column(db.String(250), nullable=False)
    company_address = db.Column(db.String(250), nullable=False)
    job_postings = db.relationship('Jobposting', backref='hiring_manager', lazy=True)

class Application(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.TIMESTAMP)
    jobseeker_id = db.Column(db.Integer, db.ForeignKey('job_seeker.id'))
    job_posting_id = db.Column(db.Integer, db.ForeignKey('jobposting.id'))
    job_seeker_rel = db.relationship('JobSeeker', back_populates='applications_rel')
    job_posting = db.relationship('Jobposting', back_populates='applications')

