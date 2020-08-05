import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

const parseDuration = (duration) => {
    return (
        (duration || '')
            .replace(/^PT/, '')
            .match(/(\d+[HM])/g) || []
    )
        .map((val) => {
            return val
                .replace('H', ' hours')
                .replace('M', ' minutes');
        })
        .join(' ');
};

const getItem = (key) => {
    return (
        document.cookie
            .match(new RegExp(`${key}=([^;$]+)`)) || []
    ).slice(1).shift();
};

const setItem = (key, val) => {
    document.cookie = `${key}=${val}; path=${document.location.pathname};`;
};

/**
 * Recipes component
 * @param {Object} props - Props
 * @param {string} props.url - Recipes URL
 */
const Recipes = (props) => {
    const el_menu = useRef();
    const el_sidebar = useRef();
    const val_open = useRef(false);
    const val_step = useRef(parseInt(getItem('step') || '0', 10));
    const val_step_count = useRef(0);
    const val_touch = useRef([0, 0]);
    const [data, setData] = useState({});
    const [step, setStep] = useState(val_step.current);
    const [stepCount, setStepCount] = useState(0);
    const [open, setOpen] = useState(false);
    const [ingredients, setIngredients] = useState(JSON.parse(getItem('ingredients') || '[]'));
    const [ingredientFilter, setIngredientFilter] = useState(false);
    const _onRecipeLoad = (e) => {
        setData(e.target.response);
        setStepCount(e.target.response.recipeInstructions.length);
    };
    const _onOpen = () => {
        setOpen(true);
    };
    const _onClose = () => {
        setOpen(false);
    };
    const _onClick = (e) => {
        if (el_sidebar.current.contains(e.target) || el_menu.current.contains(e.target)) {
            return;
        }

        _onClose();
    };
    const _onKeyUp = (e) => {
        if (open) {
            return;
        }

        switch (e.key) {
        case 'ArrowRight':
            setStep(Math.min(val_step.current + 1, val_step_count.current - 1));

            break;
        case 'ArrowLeft':
            setStep(Math.max(val_step.current - 1, 0));

            break;
        default:
            break;
        }
    };
    const _onTouchStart = (e) => {
        const touch_obj = e.changedTouches[0];

        val_touch.current = [touch_obj.pageX, touch_obj.pageY];
    };
    const _onTouchEnd = (e) => {
        const touch_obj = e.changedTouches[0];
        const new_touch = [touch_obj.pageX, touch_obj.pageY];

        if (Math.abs(val_touch.current[0] - new_touch[0]) > 10) {
            return;
        }

        if (Math.abs(val_touch.current[1] - new_touch[1]) > 10) {
            return;
        }

        if (val_open.current) {
            return;
        }

        if (el_menu.current.contains(e.target)) {
            return;
        }

        const screen_width = document.body.clientWidth;

        if (new_touch[0] > (screen_width / 2)) {
            setStep(Math.min(val_step.current + 1, val_step_count.current - 1));
        } else {
            setStep(Math.max(val_step.current - 1, 0));
        }
    };
    const _onIngredientCheck = (key) => {
        return () => {
            let new_ingredients = [];

            if (ingredients.indexOf(key) === -1) {
                new_ingredients = ingredients.concat([
                    key
                ]);
            } else {
                new_ingredients = ingredients
                    .filter((ingredient) => {
                        return ingredient !== key;
                    });
            }

            setIngredients(new_ingredients);
        };
    };
    const _onIngredientFilter = () => {
        setIngredientFilter(!ingredientFilter);
    };

    useEffect(() => {
        document.addEventListener('click', _onClick, true);
        document.addEventListener('keyup', _onKeyUp, true);
        document.addEventListener('touchstart', _onTouchStart, true);
        document.addEventListener('touchend', _onTouchEnd, true);

        if (!props.url) {
            return () => {
                document.removeEventListener('click', _onClick, true);
                document.removeEventListener('keyup', _onKeyUp, true);
                document.removeEventListener('touchstart', _onTouchStart, true);
                document.removeEventListener('touchend', _onTouchEnd, true);
            };
        }

        const xhr = new XMLHttpRequest();

        xhr.addEventListener('load', _onRecipeLoad, true);

        xhr.open('GET', props.url, true);
        xhr.responseType = 'json';
        xhr.send(null);

        return () => {
            document.removeEventListener('click', _onClick, true);
            document.removeEventListener('keyup', _onKeyUp, true);
            document.removeEventListener('touchstart', _onTouchStart, true);
            document.removeEventListener('touchend', _onTouchEnd, true);

            xhr.removeEventListener('load', _onRecipeLoad, true);
        };
    }, []);

    useEffect(() => {
        val_open.current = open;
    }, [open]);

    useEffect(() => {
        val_step.current = step;

        setItem('step', step.toString());
    }, [step]);

    useEffect(() => {
        val_step_count.current = stepCount;
    }, [stepCount]);

    useEffect(() => {
        setItem('ingredients', JSON.stringify(ingredients));
    }, [ingredients]);

    return (
        <div
            className={classNames([
                'recipe'
            ], {
                open: open
            })}>
            <div
                className="header">
                <div
                    ref={el_menu}
                    className="menu"
                    onClick={_onOpen}>
                    {'☰'}
                </div>
                <h1>
                    {data.name}
                </h1>
                <h2>
                    {data.description}
                </h2>
                <time
                    dateTime={data.prepTime}>
                    {`Prep time: ${parseDuration(data.prepTime)}`}
                </time>
                <p>
                    {'-'}
                </p>
                <time
                    dateTime={data.cookTime}>
                    {`Cook time: ${parseDuration(data.cookTime)}`}
                </time>
                <progress
                    max={stepCount}
                    value={step + 1} />
            </div>
            <div
                ref={el_sidebar}
                className="sidebar">
                <ul>
                    <li>
                        <input
                            id="ingredients"
                            type="checkbox"
                            onChange={_onIngredientFilter} />
                        <label
                            htmlFor="ingredients">
                            <b>
                                {'Ingredients'}
                            </b>
                        </label>
                    </li>
                    {
                        (data.recipeIngredient || [])
                            .map((recipeIngredient, i) => {
                                const key = `key-${i}`;
                                const checked = ingredients.indexOf(key) !== -1;

                                return (
                                    <li
                                        key={key}
                                        className={classNames({
                                            selected: (data.recipeInstructions.slice(step).shift() || {}).itemListElement.indexOf(recipeIngredient) !== -1,
                                            hide: checked && ingredientFilter
                                        })}>
                                        <input
                                            id={key}
                                            type="checkbox"
                                            checked={checked}
                                            onChange={_onIngredientCheck(key)} />
                                        <label
                                            htmlFor={key}>
                                            {recipeIngredient}
                                        </label>
                                    </li>
                                )
                            })
                    }
                </ul>
            </div>
            <div
                className="content">
                {
                    (data.recipeInstructions || [])
                        .map((recipeInstruction, i) => {
                            return (
                                <div
                                    key={recipeInstruction.name}
                                    className={classNames([
                                        'step'
                                    ], {
                                        show: step === i
                                    })}>
                                    <h3>
                                        {recipeInstruction.name}
                                    </h3>
                                    <time
                                        dateTime={recipeInstruction.timeRequired}>
                                        {`${parseDuration(recipeInstruction.timeRequired)}`}
                                    </time>
                                    <p>
                                        {recipeInstruction.text}
                                    </p>
                                </div>
                            );
                        })
                }
            </div>
        </div>
    );
};

Recipes.propTypes = {
    url: PropTypes.string,
    data: {}
};

Recipes.defaultProps = {
    url: undefined,
    data: PropTypes.object
};

export default Recipes;
