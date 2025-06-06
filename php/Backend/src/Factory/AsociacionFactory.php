<?php

/**
 * src/Factory/AsociacionFactory.php
 *
 * @license https://opensource.org/licenses/MIT MIT License
 * @link    https://www.etsisi.upm.es/ ETS de Ingeniería de Sistemas Informáticos
 */

namespace TDW\ACiencia\Factory;

use DateTime;
use TDW\ACiencia\Entity\Asociacion;

class AsociacionFactory extends ElementFactory
{
    /**
     * Asociacion builder.
     */
    public static function createElement(
        string $name,
        ?DateTime $birthDate = null,
        ?DateTime $deathDate = null,
        ?string $imageUrl = null,
        ?string $wikiUrl = null
    ): Asociacion {
        assert($name !== '');
        return new Asociacion($name, $birthDate, $deathDate, $imageUrl, $wikiUrl);
    }
}