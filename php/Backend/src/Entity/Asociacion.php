<?php

/**
 * src/Entity/Asociacion.php
 *
 * @license https://opensource.org/licenses/MIT MIT License
 * @link    https://www.etsisi.upm.es/ ETS de Ingeniería de Sistemas Informáticos
 */

namespace TDW\ACiencia\Entity;

use Doctrine\Common\Collections\{ArrayCollection, Collection};
use Doctrine\ORM\Mapping as ORM;
use JetBrains\PhpStorm\ArrayShape;
use ReflectionObject;

#[ORM\Entity, ORM\Table(name: "asociaciones")]
#[ORM\UniqueConstraint(name: "Asociacion_name_uindex", columns: [ "name" ])]
class Asociacion extends Element
{
    
    /* Conjunto de entidades que forman parte de la asociación */
    #[ORM\ManyToMany(targetEntity: Entity::class, mappedBy: "asociaciones", cascade: ["remove"])]
    #[ORM\OrderBy([ "id" => "ASC" ])]
    private Collection $entities;

    /**
     * Constructor de la Asociación.
     * @param non-empty-string $name
     * @param DateTime|null $birthDate
     * @param DateTime|null $deathDate
     * @param string|null $imageUrl
     * @param string|null $wikiUrl

     */
    public function __construct(
        string $name,
        ?DateTime $birthDate = null,
        ?DateTime $deathDate = null,
        ?string $imageUrl = null,
        ?string $wikiUrl = null
    ) {
        parent::__construct($name, $birthDate, $deathDate, $imageUrl, $wikiUrl);
        /* Initialize entities collection */
        $this->entities = new ArrayCollection();
        
    }


    
    /**
     * Obtiene las entidades que forman parte de la Asociación.
     *
     * @return Collection<Entity>
     */
    public function getEntities(): Collection
    {
        return $this->entities;
    }

    /**
     *
     * @param Entity $entity
     * 
     * @return bool
     */

    public function containsEntity(Entity $entity): bool
    {
        return $this->entities->contains($entity);
    }


    /**
     *
     * @param Entity $entity
     * 
     * @return void
     */
    public function addEntity(Entity $entity): void
    {
        $this->entities->add($entity);
        $entity->addAsociacion($this);
    }

    /**
     *
     * @param Entity $entity
     * 
     * @return bool
     */
    public function removeEntity(Entity $entity): bool
    {
        $result = $this->entities->removeElement($entity);
        $entity->removeEntity($this);
        return $result;
    }

    /**
     * @see \Stringable
     */
    public function __toString(): string
    {
        return sprintf(
            '%s entities=%s)]',
            parent::__toString(),
            $this->getCodesStr($this->getEntities()),
        );
    }

    /**
     * @see \JsonSerializable
     */
    #[ArrayShape(['asociacion' => "array|mixed"])]
    public function jsonSerialize(): mixed
    {
        /* Reflexión para examinar la instancia */
        $reflection = new ReflectionObject($this);
        $data = parent::jsonSerialize();
        $numberOfEntities = count($this->getEntities());
        $data['entities'] = $numberOfEntities !== 0 ? $this->getCodes($this->getEntities()) : null;

        return [strtolower($reflection->getShortName()) => $data];
    }
}


