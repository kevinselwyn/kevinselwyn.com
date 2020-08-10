import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

/**
 * Intro component
 * @param {Object} props - Props
 * @param {Object} props.info - Info
 * @param {Object} props.social - Social
 */
const Intro = (props) => {
    const {info, social} = props;

    return (
        <section
            id="intro">
            <div
                className="title">
                <img
                    src="/img/kevin.jpg"
                    alt={info.name}
                    title={info.name} />
            </div>
            <div
                className="content">
                <h1>
                    {info.name}
                </h1>
                <h2>
                    {info.title}
                </h2>
                <p>
                    <span>
                        {'(Full resume at '}
                    </span>
                    <a
                        href={`${info.website}/resume`}>
                        {`${info.website}/resume`}
                    </a>
                    <span>
                        {')'}
                    </span>
                </p>
                <ul
                    className="social">
                    {
                        social
                            .map((_social) => {
                                return (
                                    <li
                                        key={_social.network}
                                        className={_social.network}>
                                        <a
                                            href={_social.url}
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            {_social.network}
                                        </a>
                                    </li>
                                );
                            })
                    }
                </ul>
            </div>
            <div
                className="clearfix" />
        </section>
    );
};

Intro.propTypes = {
    info: PropTypes.object.isRequired,
    social: PropTypes.arrayOf(PropTypes.object).isRequired
};

const Contact = (props) => {
    const {info} = props;

    return (
        <section
            id="contact">
            <div
                className="title">
                <h2>
                    {'Contact'}
                </h2>
            </div>
            <div
                className="content">
                <p>
                    <strong>
                        {'Email: '}
                    </strong>
                    <a
                        href={`mailto:${info.email}`}>
                        {info.email}
                    </a>
                    <br />
                    <strong>
                        {'Website: '}
                    </strong>
                    <a
                        href={info.website}>
                        {info.website}
                    </a>
                    <br />
                    <span
                        className="download-pdf">
                        <strong>
                            {'↳ '}
                        </strong>
                        <a
                            href="/data/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            download="Kevin Selwyn - Resume.pdf">
                            {'Download resume as PDF'}
                        </a>
                    </span>
                </p>
            </div>
            <div
                className="clearfix" />
        </section>
    );
};

Contact.propTypes = {
    info: PropTypes.object.isRequired
};

const Profile = (props) => {
    const {info} = props;

    return (
        <section
            id="profile">
            <div
                className="title">
                <h2>
                    {'Profile'}
                </h2>
            </div>
            <div
                className="content">
                <p>
                    {info.profile}
                </p>
            </div>
            <div
                className="clearfix" />
        </section>
    );
};

Profile.propTypes = {
    info: PropTypes.object.isRequired
};

const Projects = (props) => {
    const {projects} = props;

    return (
        <section
            id="projects">
            <div
                className="title">
                <h2>
                    {'Personal Projects'}
                </h2>
            </div>
            <div
                className="content">
                {
                    projects
                        .map((item) => {
                            return (
                                <div
                                    key={item.name}
                                    className="project">
                                    <div
                                        className="info">
                                        <p>
                                            <strong>
                                                {item.name}
                                            </strong>
                                            <br />
                                            <small>
                                                <a
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer">
                                                    {item.url}
                                                </a>
                                            </small>
                                        </p>
                                        <Fragment>
                                            {
                                                item.description
                                                    .map((description) => {
                                                        return (
                                                            <p
                                                                key={description}>
                                                                {description}
                                                            </p>
                                                        );
                                                    })
                                            }
                                        </Fragment>
                                    </div>
                                    <div
                                        className="meta">
                                        <div
                                            className="meta__item">
                                            <small>
                                                {'Language(s):'}
                                            </small>
                                            <div
                                                className="languages">
                                                {
                                                    item.languages
                                                        .map((language) => {
                                                            return (
                                                                <small
                                                                    key={language}
                                                                    className="chip">
                                                                    {language}
                                                                </small>
                                                            );
                                                        })
                                                }
                                            </div>
                                        </div>
                                        <div
                                            className="meta__item">
                                            <small>
                                                {'Tech:'}
                                            </small>
                                            <div
                                                className="tech">
                                                {
                                                    item.tech
                                                        .map((language) => {
                                                            return (
                                                                <small
                                                                    key={language}
                                                                    className="chip">
                                                                    {language}
                                                                </small>
                                                            );
                                                        })
                                                }
                                            </div>
                                        </div>
                                        <div
                                            className="clearfix" />
                                    </div>
                                    <div
                                        className="clearfix" />
                                </div>
                            );
                        })
                }
            </div>
            <div
                className="clearfix" />
        </section>
    );
};

Projects.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.object).isRequired
};

const Employment = (props) => {
    const {employment} = props;

    return (
        <section
            id="employment">
            <div
                className="title">
                <h2>
                    {'Employment'}
                </h2>
            </div>
            <div
                className="content">
                {
                    employment
                        .map((item) => {
                            return (
                                <div
                                    key={item.employer}
                                    className="employment">
                                    <div
                                        className="info">
                                        <p>
                                            <strong>
                                                {
                                                    (item.links.length !== 1) ? (
                                                        item.employer
                                                    ) : (
                                                        <a
                                                            href={item.links[0].url}
                                                            target="_blank"
                                                            rel="noopener noreferrer">
                                                            {item.employer}
                                                        </a>
                                                    )
                                                }
                                            </strong>
                                            <span>
                                                {' '}
                                            </span>
                                            <em>
                                                {`${item.start} - ${item.end}`}
                                            </em>
                                            <br />
                                            {
                                                item.links.length <= 1 ? null : (
                                                    <Fragment>
                                                        <small>
                                                            <span>
                                                                {'↳ '}
                                                            </span>
                                                            {
                                                                item.links
                                                                    .map((link, i, links) => {
                                                                        return (
                                                                            <Fragment
                                                                                key={link.url}>
                                                                                <a
                                                                                    href={link.url}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer">
                                                                                    {link.name}
                                                                                </a>
                                                                                {
                                                                                    (i === links.length - 1) ? null : (
                                                                                        <span>
                                                                                            {', '}
                                                                                        </span>
                                                                                    )
                                                                                }
                                                                            </Fragment>
                                                                        );
                                                                    })
                                                            }
                                                        </small>
                                                        <br />
                                                    </Fragment>
                                                )
                                            }
                                            <small>
                                                {item.title}
                                            </small>
                                        </p>
                                        {
                                            item.description
                                                .map((description) => {
                                                    return (
                                                        <p
                                                            key={description}>
                                                            {description}
                                                        </p>
                                                    );
                                                })
                                        }
                                    </div>
                                    <div
                                        className="meta">
                                        {
                                            !item.languages ? null : (
                                                <div
                                                    className="meta__item">
                                                    <small>
                                                        {'Language(s):'}
                                                    </small>
                                                    <div
                                                        className="languages">
                                                        {
                                                            item.languages
                                                                .map((language) => {
                                                                    return (
                                                                        <small
                                                                            key={language}
                                                                            className="chip">
                                                                            {language}
                                                                        </small>
                                                                    );
                                                                })
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        }
                                        {
                                            !item.tech ? null : (
                                                <div
                                                    className="meta__item">
                                                    <small>
                                                        {'Tech:'}
                                                    </small>
                                                    <div
                                                        className="tech">
                                                        {
                                                            item.tech
                                                                .map((language) => {
                                                                    return (
                                                                        <small
                                                                            key={language}
                                                                            className="chip">
                                                                            {language}
                                                                        </small>
                                                                    );
                                                                })
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div
                                        className="clearfix" />
                                </div>
                            );
                        })
                }
            </div>
            <div
                className="clearfix" />
        </section>
    );
};

Employment.propTypes = {
    employment: PropTypes.arrayOf(PropTypes.object).isRequired
};

const Education = (props) => {
    const {education} = props;

    return (
        <section
            id="eduation">
            <div
                className="title">
                <h2>
                    {'Education'}
                </h2>
            </div>
            <div
                className="content">
                {
                    education
                        .map((item) => {
                            return (
                                <div
                                    key={item.school}
                                    className="education">
                                    <p>
                                        <strong>
                                            {item.school}
                                        </strong>
                                        <span>
                                            {' '}
                                        </span>
                                        <em>
                                            {`${item.start} - ${item.end}`}
                                        </em>
                                        <br />
                                        <em>
                                            {item.degree}
                                        </em>
                                    </p>
                                </div>
                            );
                        })
                }
            </div>
            <div
                className="clearfix" />
        </section>
    );
};

Education.propTypes = {
    education: PropTypes.arrayOf(PropTypes.object).isRequired
};

const Skills = (props) => {
    const {skills} = props;

    return (
        <section
            id="skills">
            <div
                className="title">
                <h2>
                    {'Skills'}
                </h2>
            </div>
            <div
                className="content">
                <p>
                    {'Language(s):'}
                </p>
                {
                    (skills.language || [])
                        .map((item) => {
                            return (
                                <small
                                    key={item}
                                    className="chip">
                                    {item}
                                </small>
                            );
                        })
                }
                <p>
                    {'Tech:'}
                </p>
                {
                    (skills.tech || [])
                        .map((item) => {
                            return (
                                <small
                                    key={item}
                                    className="chip">
                                    {item}
                                </small>
                            );
                        })
                }
            </div>
            <div
                className="clearfix" />
        </section>
    );
};

Skills.propTypes = {
    skills: PropTypes.object.isRequired
};

const Interests = (props) => {
    const {info} = props;

    return (
        <section
            id="interests">
            <div
                className="title">
                <h2>
                    {'Interests'}
                </h2>
            </div>
            <div
                className="content">
                <p>
                    {info.interests}
                </p>
            </div>
            <div
                className="clearfix" />
        </section>
    );
};

Interests.propTypes = {
    info: PropTypes.object.isRequired
};

/**
 * Resume component
 * @param {Object} props - Props
 * @param {string} props.url - Resume URL
 */
const Resume = (props) => {
    const [data, setData] = useState(props.data);
    const _onStateLoad = (e) => {
        setData(e.target.response.data);
    };

    useEffect(() => {
        if (!props.url) {
            return;
        }

        const xhr = new XMLHttpRequest();

        xhr.addEventListener('load', _onStateLoad, true);

        xhr.open('GET', props.url, true);
        xhr.responseType = 'json';
        xhr.send(null);

        return () => {
            xhr.removeEventListener('load', _onStateLoad, true);
        };
    }, []);

    return (
        <Fragment>
            <Intro
                info={data.info}
                social={data.social} />
            <Contact
                info={data.info} />
            <Profile
                info={data.info} />
            <Projects
                projects={data.projects} />
            <Employment
                employment={data.employment} />
            <Education
                education={data.education} />
            <Skills
                skills={data.skills} />
            <Interests
                info={data.info} />
        </Fragment>
    );
};

Resume.propTypes = {
    url: PropTypes.string,
    data: PropTypes.object
};

Resume.defaultProps = {
    data: {
        info: {},
        social: [],
        projects: [],
        employment: [],
        education: [],
        skills: []
    }
};

export default Resume;
