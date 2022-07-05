import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NestedLink.module.css';

const NestedLink = ({ listName, links, parentShow, setParentShow, icon }) => {
    const [show, setShow] = useState(false);

    const navigate = useNavigate();
    const clickHandler = (e) => {
        setShow(!show);
        setParentShow(listName);
        console.log(parentShow, listName);
    };

    useEffect(() => {
        if (parentShow !== listName) setShow(false);
    }, [parentShow, listName]);

    return (
        <div
            className={classNames(
                show
                    ? styles.nestedLinkContainer
                    : styles.nestedLinkContainerDisable
            )}
        >
            <div className={styles.nestedLinkName} onClick={clickHandler}>
                {icon}
                <h4>{listName}</h4>
            </div>
            {parentShow === listName && (
                <ul
                    className={classNames(
                        styles.nestedLink,
                        !show ? styles.disable : ''
                    )}
                >
                    {links.map((link) => (
                        <li
                            className={styles.nestedLinkList}
                            onClick={() => navigate(link.to)}
                        >
                            {link.text}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NestedLink;
